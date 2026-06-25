package com.neilpontecorvo.harmonicmix.ui.wheel

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import com.neilpontecorvo.harmonicmix.domain.CamelotRelation
import com.neilpontecorvo.harmonicmix.ui.theme.AppBackground
import com.neilpontecorvo.harmonicmix.ui.theme.PrimaryText

@Composable
fun CamelotWheelScreen(
    viewModel: WheelViewModel = viewModel(),
) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()

    Scaffold(
        modifier = Modifier
            .fillMaxSize()
            .background(AppBackground),
        containerColor = AppBackground,
        topBar = {
            TopAppBar(
                title = { Text("CAMELOT GUIDE") },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = AppBackground,
                    titleContentColor = PrimaryText,
                ),
            )
        },
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .padding(paddingValues)
                .navigationBarsPadding()
                .fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
        ) {
            Box(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxWidth()
                    .padding(12.dp),
                contentAlignment = Alignment.Center,
            ) {
                CamelotWheel(state = state, onSelect = viewModel::select)
            }
            Legend()
        }
    }
}

@Composable
private fun Legend() {
    Row(
        modifier = Modifier
            .testTag("legend")
            .padding(16.dp),
        horizontalArrangement = Arrangement.spacedBy(18.dp),
    ) {
        LegendItem("Selected / Primary", CamelotRelation.SELECTED)
        LegendItem("Compatible", CamelotRelation.COMPATIBLE)
        LegendItem("Energy boost", CamelotRelation.ENERGY)
    }
}

@Composable
private fun LegendItem(text: String, relation: CamelotRelation) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Box(
            modifier = Modifier
                .size(14.dp)
                .background(colorFor(relation)),
        )
        Spacer(Modifier.width(6.dp))
        Text(
            text = text,
            color = PrimaryText,
            style = MaterialTheme.typography.labelMedium,
        )
    }
}
