package com.neilpontecorvo.harmonicmix.domain
import org.junit.Assert.*
import org.junit.Test
class CamelotDomainTest { @Test fun catalogIsCanonical(){ assertEquals(24,CamelotCatalog.keys.size); assertEquals(12,CamelotCatalog.keys.count{it.letter==CamelotLetter.A}); assertEquals(12,CamelotCatalog.keys.count{it.letter==CamelotLetter.B}); assertEquals(24,CamelotCatalog.keys.map{it.code}.distinct().size); assertTrue(CamelotCatalog.keys.all{it.musicalKey.isNotBlank()}) }
@Test fun parsingAndWrapping(){ assertEquals("06A", CamelotCode.parse("06a")!!.value); assertNull(CamelotCode.parse("13A")); assertNull(CamelotCode.parse("1A")); assertEquals(1, wrapCamelotNumber(13)); assertEquals(12, wrapCamelotNumber(0)); assertEquals(4, wrapCamelotNumber(16)); assertEquals(3, wrapCamelotNumber(8+7)) } }
