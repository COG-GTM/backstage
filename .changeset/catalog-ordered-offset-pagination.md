---
'@backstage/plugin-catalog-backend': patch
---

Improved the performance of offset-paginated entity listings that are ordered by a field. Entities before the requested offset are now skipped in the database instead of being loaded and discarded by the backend, so deep pages no longer get slower the further in they are.
