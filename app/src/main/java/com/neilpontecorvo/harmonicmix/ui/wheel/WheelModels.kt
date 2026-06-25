package com.neilpontecorvo.harmonicmix.ui.wheel

import com.neilpontecorvo.harmonicmix.domain.CamelotCode
import com.neilpontecorvo.harmonicmix.domain.CamelotKey
import com.neilpontecorvo.harmonicmix.domain.CamelotRelation

enum class WheelRing {
    INNER_A,
    OUTER_B,
}

data class WheelSectorUiState(
    val key: CamelotKey,
    val ring: WheelRing,
    val index: Int,
    val relation: CamelotRelation,
    val isSelected: Boolean,
    val accessibilityLabel: String,
)

data class WheelUiState(
    val selectedKey: CamelotCode?,
    val sectors: List<WheelSectorUiState>,
)

fun pronounceKeyName(name: String): String = name
    .replace("♯", "-sharp")
    .replace("♭", "-flat")
