# Test Plan
- Domain unit tests verify catalog size, uniqueness, parsing, labels, and wrapping.
- Relation unit tests verify every selected key yields 1 selected, 5 compatible, 3 energy, and 15 neutral plus required examples.
- Geometry unit tests verify center/outside rejection, 24 sector centers, ring resolution, top 12 position, clockwise 01, and resize behavior.
- ViewModel unit tests verify initial state, selection replacement, repeated selection, restoration, and 24 sector updates.
- Compose instrumentation tests verify title, legend, all 24 sector semantics, semantic click, 06A state updates, and labels.
