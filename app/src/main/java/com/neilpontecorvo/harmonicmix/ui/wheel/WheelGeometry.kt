package com.neilpontecorvo.harmonicmix.ui.wheel

import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import com.neilpontecorvo.harmonicmix.domain.CamelotCatalog
import com.neilpontecorvo.harmonicmix.domain.CamelotCode
import com.neilpontecorvo.harmonicmix.domain.CamelotLetter
import com.neilpontecorvo.harmonicmix.domain.camelotCode
import kotlin.math.atan2
import kotlin.math.cos
import kotlin.math.floor
import kotlin.math.hypot
import kotlin.math.min
import kotlin.math.sin

private const val WEDGE_DEGREES = 30.0
private const val TOP_DEGREES = -90.0

data class WheelLayout(
    val center: Offset,
    val outerRadius: Float,
    val innerRingOuterRadius: Float,
    val centerHoleRadius: Float,
) {
    fun sectorCenter(number: Int, ring: WheelRing): Offset {
        val wedgeIndex = CamelotCatalog.wheelOrderNumbers.indexOf(number)
        require(wedgeIndex >= 0) { "Unknown Camelot number $number" }

        val angle = Math.toRadians(TOP_DEGREES + wedgeIndex * WEDGE_DEGREES)
        val radius = when (ring) {
            WheelRing.OUTER_B -> (innerRingOuterRadius + outerRadius) / 2f
            WheelRing.INNER_A -> (centerHoleRadius + innerRingOuterRadius) / 2f
        }

        return Offset(
            x = center.x + cos(angle).toFloat() * radius,
            y = center.y + sin(angle).toFloat() * radius,
        )
    }

    fun resolve(point: Offset): CamelotCode? {
        val dx = point.x - center.x
        val dy = point.y - center.y
        val radius = hypot(dx, dy)

        if (radius < centerHoleRadius || radius > outerRadius) return null

        val clockwiseDegreesFromTop = (Math.toDegrees(atan2(dy.toDouble(), dx.toDouble())) + 450.0) % 360.0
        val wedgeIndex = floor(((clockwiseDegreesFromTop + WEDGE_DEGREES / 2.0) % 360.0) / WEDGE_DEGREES).toInt()
        val number = CamelotCatalog.wheelOrderNumbers[wedgeIndex]
        val letter = if (radius <= innerRingOuterRadius) CamelotLetter.A else CamelotLetter.B

        return camelotCode(number, letter)
    }
}

object WheelGeometry {
    fun calculate(size: Size): WheelLayout {
        val diameter = min(size.width, size.height)
        val outerRadius = diameter * 0.49f
        return WheelLayout(
            center = Offset(size.width / 2f, size.height / 2f),
            outerRadius = outerRadius,
            innerRingOuterRadius = outerRadius * 0.67f,
            centerHoleRadius = outerRadius * 0.27f,
        )
    }
}
