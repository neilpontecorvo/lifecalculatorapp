package com.neilpontecorvo.harmonicmix.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Typography
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable

private val HarmonicMixColorScheme = darkColorScheme(
    background = AppBackground,
    surface = AppBackground,
    primary = SelectedSector,
    onPrimary = PrimaryText,
    onBackground = PrimaryText,
    onSurface = PrimaryText,
)

@Composable
fun HarmonicMixTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = HarmonicMixColorScheme,
        typography = Typography(),
        content = content,
    )
}
