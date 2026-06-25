package com.neilpontecorvo.harmonicmix.ui.wheel
import androidx.lifecycle.SavedStateHandle
import com.neilpontecorvo.harmonicmix.domain.*
import org.junit.Assert.*
import org.junit.Test
class WheelViewModelTest { @Test fun selectionAndRestore(){ val vm=WheelViewModel(SavedStateHandle()); assertNull(vm.uiState.value.selectedKey); assertEquals(24,vm.uiState.value.sectors.size); val a=CamelotCode("06A"); vm.select(a); assertEquals(a,vm.uiState.value.selectedKey); vm.select(a); assertEquals(a,vm.uiState.value.selectedKey); vm.select(CamelotCode("01B")); assertEquals("01B", vm.uiState.value.selectedKey!!.value); val restored=WheelViewModel(SavedStateHandle(mapOf(WheelViewModel.KEY_SELECTED_CODE to "01B"))); assertEquals("01B", restored.uiState.value.selectedKey!!.value); assertEquals(24, restored.uiState.value.sectors.size) } }
