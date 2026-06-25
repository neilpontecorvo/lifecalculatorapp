package com.neilpontecorvo.harmonicmix.ui.wheel
import androidx.compose.ui.geometry.Size
import com.neilpontecorvo.harmonicmix.domain.*
import org.junit.Assert.*
import org.junit.Test
class WheelGeometryTest { @Test fun hitTesting(){ val l=WheelGeometry.calculate(Size(1000f,1000f)); assertNull(l.resolve(l.center)); assertNull(l.resolve(l.center.copy(x=l.center.x+l.outerRadius+2))); CamelotCatalog.wheelOrderNumbers.forEach{ n -> assertEquals("%02dB".format(n), l.resolve(l.sectorCenter(n,WheelRing.OUTER_B))!!.value); assertEquals("%02dA".format(n), l.resolve(l.sectorCenter(n,WheelRing.INNER_A))!!.value) }; assertEquals("12B", l.resolve(l.sectorCenter(12,WheelRing.OUTER_B))!!.value); assertEquals("01B", l.resolve(l.sectorCenter(1,WheelRing.OUTER_B))!!.value) }
@Test fun resized(){ val l=WheelGeometry.calculate(Size(600f,900f)); assertEquals("12A", l.resolve(l.sectorCenter(12,WheelRing.INNER_A))!!.value) } }
