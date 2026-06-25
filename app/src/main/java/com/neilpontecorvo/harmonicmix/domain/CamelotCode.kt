package com.neilpontecorvo.harmonicmix.domain

@JvmInline
value class CamelotCode(val value: String) {
    init {
        require(isValid(value)) { "Invalid Camelot code $value" }
    }

    companion object {
        private val CodePattern = Regex("^(0[1-9]|1[0-2])[AB]$")

        fun parse(raw: String?): CamelotCode? {
            val normalized = raw?.trim()?.uppercase() ?: return null
            return if (isValid(normalized)) CamelotCode(normalized) else null
        }

        private fun isValid(value: String): Boolean = CodePattern.matches(value)
    }
}

fun wrapCamelotNumber(number: Int): Int = ((number - 1).floorMod(12)) + 1

private fun Int.floorMod(mod: Int): Int = ((this % mod) + mod) % mod

fun camelotCode(number: Int, letter: CamelotLetter): CamelotCode =
    CamelotCode("%02d%s".format(wrapCamelotNumber(number), letter.name))

enum class CamelotLetter {
    A,
    B;

    fun opposite(): CamelotLetter = if (this == A) B else A
}

enum class CamelotMode {
    MAJOR,
    MINOR,
}
