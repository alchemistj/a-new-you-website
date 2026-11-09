# SRA Roofing journey tracking: reference copy

A read-only copy of the journey-tracking code from `alchemistj/sra-roofing-website` (main at
676160b, copied Nov 9, 2026). Cursor's run can't read that repo, so the code is copied here.

Each file keeps its SRA path, with `.txt` added so the build, lint and vitest skip it. Port
what this site needs into the real paths (`middleware.ts`, `src/lib/measurement/`,
`src/lib/attribution/`, `api/site-events.ts`, `server/lib/forwardMeasurementCollect.ts`,
and tests under `tests/`).

The SRA tests use `node:test` and should be rewritten for vitest. `astro/lib/siteRuntime.ts`
shows where SRA calls the bootstrap, and also imports a ServiceTitan scheduler. Don't port
the scheduler, ServiceTitan or the lead-form attribution parts.

Delete this folder in the same PR once the port is done.
