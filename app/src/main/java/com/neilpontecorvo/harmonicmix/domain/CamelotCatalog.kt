package com.neilpontecorvo.harmonicmix.domain

object CamelotCatalog {
    val keys: List<CamelotKey> = listOf(
        key(1, CamelotLetter.A, "A♭ minor", "A♭", CamelotMode.MINOR, "G♯ minor"),
        key(1, CamelotLetter.B, "B major", "B", CamelotMode.MAJOR),
        key(2, CamelotLetter.A, "E♭ minor", "E♭", CamelotMode.MINOR, "D♯ minor"),
        key(2, CamelotLetter.B, "F♯ major", "F♯", CamelotMode.MAJOR, "G♭ major"),
        key(3, CamelotLetter.A, "B♭ minor", "B♭", CamelotMode.MINOR, "A♯ minor"),
        key(3, CamelotLetter.B, "D♭ major", "D♭", CamelotMode.MAJOR, "C♯ major"),
        key(4, CamelotLetter.A, "F minor", "F", CamelotMode.MINOR),
        key(4, CamelotLetter.B, "A♭ major", "A♭", CamelotMode.MAJOR, "G♯ major"),
        key(5, CamelotLetter.A, "C minor", "C", CamelotMode.MINOR),
        key(5, CamelotLetter.B, "E♭ major", "E♭", CamelotMode.MAJOR, "D♯ major"),
        key(6, CamelotLetter.A, "G minor", "G", CamelotMode.MINOR),
        key(6, CamelotLetter.B, "B♭ major", "B♭", CamelotMode.MAJOR, "A♯ major"),
        key(7, CamelotLetter.A, "D minor", "D", CamelotMode.MINOR),
        key(7, CamelotLetter.B, "F major", "F", CamelotMode.MAJOR),
        key(8, CamelotLetter.A, "A minor", "A", CamelotMode.MINOR),
        key(8, CamelotLetter.B, "C major", "C", CamelotMode.MAJOR),
        key(9, CamelotLetter.A, "E minor", "E", CamelotMode.MINOR),
        key(9, CamelotLetter.B, "G major", "G", CamelotMode.MAJOR),
        key(10, CamelotLetter.A, "B minor", "B", CamelotMode.MINOR),
        key(10, CamelotLetter.B, "D major", "D", CamelotMode.MAJOR),
        key(11, CamelotLetter.A, "F♯ minor", "F♯", CamelotMode.MINOR, "G♭ minor"),
        key(11, CamelotLetter.B, "A major", "A", CamelotMode.MAJOR),
        key(12, CamelotLetter.A, "D♭ minor", "D♭", CamelotMode.MINOR, "C♯ minor"),
        key(12, CamelotLetter.B, "E major", "E", CamelotMode.MAJOR),
    )

    val wheelOrderNumbers: List<Int> = listOf(12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11)

    private val byCode: Map<String, CamelotKey> = keys.associateBy { it.code.value }

    fun get(code: CamelotCode): CamelotKey = byCode.getValue(code.value)

    fun find(code: String?): CamelotKey? = CamelotCode.parse(code)?.let { byCode[it.value] }

    fun key(number: Int, letter: CamelotLetter): CamelotKey = get(camelotCode(number, letter))

    private fun key(
        number: Int,
        letter: CamelotLetter,
        musicalKey: String,
        tonicPitchClass: String,
        mode: CamelotMode,
        enharmonicAlias: String? = null,
    ): CamelotKey = CamelotKey(
        code = camelotCode(number, letter),
        number = number,
        letter = letter,
        musicalKey = musicalKey,
        tonicPitchClass = tonicPitchClass,
        mode = mode,
        enharmonicAlias = enharmonicAlias,
    )
}
