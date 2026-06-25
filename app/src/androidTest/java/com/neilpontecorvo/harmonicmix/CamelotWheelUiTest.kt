package com.neilpontecorvo.harmonicmix
import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import org.junit.Rule
import org.junit.Test
class CamelotWheelUiTest { @get:Rule val rule = createAndroidComposeRule<MainActivity>()
@Test fun screenSemanticsAndSelection(){ rule.onNodeWithText("CAMELOT GUIDE").assertExists(); rule.onNodeWithTag("legend").assertExists(); val tags=(1..12).flatMap{ listOf("%02dA".format(it),"%02dB".format(it)) }; tags.forEach{ rule.onNodeWithTag("sector-$it").assertExists() }; rule.onNodeWithTag("sector-06A").performClick(); rule.onNodeWithContentDescription("06A, G minor, selected primary").assertExists(); rule.onNodeWithContentDescription("05A, C minor, compatible").assertExists(); rule.onNodeWithContentDescription("08A, A minor, energy boost").assertExists(); rule.onNodeWithText("06A", substring=true).assertExists() }
}
