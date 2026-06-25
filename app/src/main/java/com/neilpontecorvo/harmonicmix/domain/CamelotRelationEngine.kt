package com.neilpontecorvo.harmonicmix.domain

object CamelotRelationEngine {
    fun relationsFor(selected: CamelotCode?): Map<CamelotCode, CamelotRelation> {
        val relations = CamelotCatalog.keys
            .associate { key -> key.code to CamelotRelation.NEUTRAL }
            .toMutableMap()

        if (selected == null) return relations

        val selectedKey = CamelotCatalog.get(selected)
        val number = selectedKey.number
        val letter = selectedKey.letter
        val oppositeLetter = letter.opposite()

        compatibleCodes(number, letter, oppositeLetter).forEach { code ->
            relations[code] = CamelotRelation.COMPATIBLE
        }

        energyCodes(number, letter).forEach { code ->
            relations[code] = CamelotRelation.ENERGY
        }

        relations[selected] = CamelotRelation.SELECTED
        return relations
    }

    private fun compatibleCodes(
        number: Int,
        letter: CamelotLetter,
        oppositeLetter: CamelotLetter,
    ): List<CamelotCode> = listOf(
        camelotCode(number - 1, letter),
        camelotCode(number + 1, letter),
        camelotCode(number, oppositeLetter),
        camelotCode(number - 3, oppositeLetter),
        camelotCode(number + 3, oppositeLetter),
    )

    private fun energyCodes(number: Int, letter: CamelotLetter): List<CamelotCode> = listOf(
        camelotCode(number + 2, letter),
        camelotCode(number + 5, letter),
        camelotCode(number + 7, letter),
    )
}
