package com.neilpontecorvo.harmonicmix.ui.wheel

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.onClick
import androidx.compose.ui.semantics.role
import androidx.compose.ui.semantics.selected
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.testTag
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.TextMeasurer
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.drawText
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.rememberTextMeasurer
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.Constraints
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.neilpontecorvo.harmonicmix.domain.CamelotCatalog
import com.neilpontecorvo.harmonicmix.domain.CamelotCode
import com.neilpontecorvo.harmonicmix.domain.CamelotRelation
import com.neilpontecorvo.harmonicmix.ui.theme.AppBackground
import com.neilpontecorvo.harmonicmix.ui.theme.CompatibleSector
import com.neilpontecorvo.harmonicmix.ui.theme.Divider
import com.neilpontecorvo.harmonicmix.ui.theme.EnergySector
import com.neilpontecorvo.harmonicmix.ui.theme.NeutralSector
import com.neilpontecorvo.harmonicmix.ui.theme.PrimaryText
import com.neilpontecorvo.harmonicmix.ui.theme.SelectedSector
import kotlin.math.roundToInt

@Composable
fun CamelotWheel(
    state: WheelUiState,
    onSelect: (CamelotCode) -> Unit,
) {
    BoxWithConstraints(
        modifier = Modifier
            .fillMaxSize()
            .aspectRatio(1f),
    ) {
        val wheelSize = minOf(maxWidth, maxHeight)
        val textMeasurer = rememberTextMeasurer()
        var layout by remember { mutableStateOf(WheelGeometry.calculate(Size.Zero)) }

        Canvas(
            modifier = Modifier
                .size(wheelSize)
                .pointerInput(Unit) {
                    awaitPointerEventScope {
                        while (true) {
                            val event = awaitPointerEvent()
                            val change = event.changes.firstOrNull() ?: continue
                            if (change.pressed) {
                                layout.resolve(change.position)?.let { code ->
                                    onSelect(code)
                                    change.consume()
                                }
                            }
                        }
                    }
                }
                .testTag("camelot-wheel"),
        ) {
            layout = WheelGeometry.calculate(size)
            drawWheel(
                layout = layout,
                state = state,
                textMeasurer = textMeasurer,
            )
        }

        state.sectors.forEach { sector ->
            val position = layout.sectorCenter(sector.key.number, sector.ring)
            Box(
                modifier = Modifier
                    .offset {
                        IntOffset(
                            x = (position.x - 24).roundToInt(),
                            y = (position.y - 24).roundToInt(),
                        )
                    }
                    .size(48.dp)
                    .semantics {
                        role = Role.Button
                        contentDescription = sector.accessibilityLabel
                        testTag = "sector-${sector.key.code.value}"
                        selected = sector.isSelected
                        onClick {
                            onSelect(sector.key.code)
                            true
                        }
                    },
            )
        }
    }
}

private fun DrawScope.drawWheel(
    layout: WheelLayout,
    state: WheelUiState,
    textMeasurer: TextMeasurer,
) {
    state.sectors
        .sortedByDescending { sector -> sector.ring.ordinal }
        .forEach { sector -> drawSectorFill(layout, sector) }

    state.sectors.forEach { sector ->
        drawSectorBorderAndMarker(layout, sector)
        drawSectorLabel(layout, sector, textMeasurer)
    }

    drawCircle(AppBackground, layout.centerHoleRadius, layout.center)
    drawCircle(Divider, layout.centerHoleRadius, layout.center, style = Stroke(2f))
}

private fun DrawScope.drawSectorFill(layout: WheelLayout, sector: WheelSectorUiState) {
    val bounds = sectorBounds(layout, sector)
    drawArc(
        color = colorFor(sector.relation),
        startAngle = sectorStartAngle(sector),
        sweepAngle = 30f,
        useCenter = true,
        topLeft = bounds.topLeft,
        size = bounds.size,
    )
    drawCircle(AppBackground, bounds.innerRadius, layout.center)
}

private fun DrawScope.drawSectorBorderAndMarker(layout: WheelLayout, sector: WheelSectorUiState) {
    val bounds = sectorBounds(layout, sector)
    val strokeWidth = if (sector.isSelected) 4f else 1.8f
    drawArc(
        color = Divider,
        startAngle = sectorStartAngle(sector),
        sweepAngle = 30f,
        useCenter = true,
        topLeft = bounds.topLeft,
        size = bounds.size,
        style = Stroke(strokeWidth),
    )

    if (sector.relation == CamelotRelation.COMPATIBLE || sector.relation == CamelotRelation.ENERGY) {
        val markerRadius = bounds.outerRadius - 8f
        drawArc(
            color = PrimaryText.copy(alpha = 0.65f),
            startAngle = sectorStartAngle(sector) + 4f,
            sweepAngle = 22f,
            useCenter = false,
            topLeft = Offset(layout.center.x - markerRadius, layout.center.y - markerRadius),
            size = Size(markerRadius * 2f, markerRadius * 2f),
            style = Stroke(3f),
        )
    }
}

private fun DrawScope.drawSectorLabel(
    layout: WheelLayout,
    sector: WheelSectorUiState,
    textMeasurer: TextMeasurer,
) {
    val bounds = sectorBounds(layout, sector)
    val labelCenter = layout.sectorCenter(sector.key.number, sector.ring)
    val fontSize = if (layout.outerRadius > 330f) 13.sp else 10.sp
    val maxWidth = ((bounds.outerRadius - bounds.innerRadius) * 1.62f).roundToInt().coerceAtLeast(54)
    val textLayout = textMeasurer.measure(
        text = AnnotatedString("${sector.key.code.value}\n${sector.key.musicalKey}"),
        style = TextStyle(
            color = PrimaryText,
            fontSize = fontSize,
            fontWeight = FontWeight.Bold,
            textAlign = TextAlign.Center,
            lineHeight = fontSize * 1.1,
        ),
        constraints = Constraints(maxWidth = maxWidth),
    )

    drawText(
        textLayoutResult = textLayout,
        topLeft = Offset(
            x = labelCenter.x - textLayout.size.width / 2f,
            y = labelCenter.y - textLayout.size.height / 2f,
        ),
    )
}

private data class SectorBounds(
    val outerRadius: Float,
    val innerRadius: Float,
    val topLeft: Offset,
    val size: Size,
)

private fun sectorBounds(layout: WheelLayout, sector: WheelSectorUiState): SectorBounds {
    val outerRadius = when (sector.ring) {
        WheelRing.OUTER_B -> layout.outerRadius
        WheelRing.INNER_A -> layout.innerRingOuterRadius
    }
    val innerRadius = when (sector.ring) {
        WheelRing.OUTER_B -> layout.innerRingOuterRadius
        WheelRing.INNER_A -> layout.centerHoleRadius
    }

    return SectorBounds(
        outerRadius = outerRadius,
        innerRadius = innerRadius,
        topLeft = Offset(layout.center.x - outerRadius, layout.center.y - outerRadius),
        size = Size(outerRadius * 2f, outerRadius * 2f),
    )
}

private fun sectorStartAngle(sector: WheelSectorUiState): Float {
    val wedgeIndex = CamelotCatalog.wheelOrderNumbers.indexOf(sector.key.number)
    return -105f + wedgeIndex * 30f
}

fun colorFor(relation: CamelotRelation) = when (relation) {
    CamelotRelation.SELECTED -> SelectedSector
    CamelotRelation.COMPATIBLE -> CompatibleSector
    CamelotRelation.ENERGY -> EnergySector
    CamelotRelation.NEUTRAL -> NeutralSector
}
