package com.neilpontecorvo.harmonicmix.ui

import androidx.compose.runtime.Composable
import com.neilpontecorvo.harmonicmix.ui.theme.HarmonicMixTheme
import com.neilpontecorvo.harmonicmix.ui.wheel.CamelotWheelScreen

@Composable
fun HarmonicMixApp() {
    HarmonicMixTheme { CamelotWheelScreen() }
}
