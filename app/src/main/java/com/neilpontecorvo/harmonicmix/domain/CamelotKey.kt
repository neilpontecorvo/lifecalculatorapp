package com.neilpontecorvo.harmonicmix.domain

data class CamelotKey(
    val code: CamelotCode,
    val number: Int,
    val letter: CamelotLetter,
    val musicalKey: String,
    val tonicPitchClass: String,
    val mode: CamelotMode,
    val enharmonicAlias: String? = null,
)
