package com.neilpontecorvo.harmonicmix.ui.wheel

import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import com.neilpontecorvo.harmonicmix.domain.CamelotCatalog
import com.neilpontecorvo.harmonicmix.domain.CamelotCode
import com.neilpontecorvo.harmonicmix.domain.CamelotLetter
import com.neilpontecorvo.harmonicmix.domain.CamelotRelation
import com.neilpontecorvo.harmonicmix.domain.CamelotRelationEngine
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class WheelViewModel(
    private val savedStateHandle: SavedStateHandle,
) : ViewModel() {
    private val _uiState = MutableStateFlow(
        buildState(CamelotCode.parse(savedStateHandle.get<String>(KEY_SELECTED_CODE))),
    )
    val uiState: StateFlow<WheelUiState> = _uiState.asStateFlow()

    fun select(code: CamelotCode) {
        savedStateHandle[KEY_SELECTED_CODE] = code.value
        _uiState.value = buildState(code)
    }

    private fun buildState(selected: CamelotCode?): WheelUiState {
        val relations = CamelotRelationEngine.relationsFor(selected)
        val sectors = CamelotCatalog.wheelOrderNumbers.flatMapIndexed { index, number ->
            listOf(
                CamelotCatalog.key(number, CamelotLetter.B) to WheelRing.OUTER_B,
                CamelotCatalog.key(number, CamelotLetter.A) to WheelRing.INNER_A,
            ).map { (key, ring) ->
                val relation = relations.getValue(key.code)
                WheelSectorUiState(
                    key = key,
                    ring = ring,
                    index = index,
                    relation = relation,
                    isSelected = relation == CamelotRelation.SELECTED,
                    accessibilityLabel = "${key.code.value}, ${pronounceKeyName(key.musicalKey)}, ${relation.label}",
                )
            }
        }

        return WheelUiState(selectedKey = selected, sectors = sectors)
    }

    companion object {
        const val KEY_SELECTED_CODE = "selected_camelot_code"
    }
}
