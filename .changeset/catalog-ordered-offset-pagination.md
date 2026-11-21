---
'@backstage/plugin-catalog-backend': patch
---

Improved the performance of offset-paginated entity listings that are ordered by a field. Entities before the requested offset are now skipped in the database instead of being loaded and discarded by the backend, which makes deep pages considerably faster.
