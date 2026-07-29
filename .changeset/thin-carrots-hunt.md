---
'@backstage/plugin-kubernetes-backend': minor
---

**BREAKING**: The deprecated `POST /services/:serviceId` endpoint now looks up the requested entity in the software catalog using the caller's credentials, instead of trusting the entity sent in the request body. Requests without an entity, with an invalid entity reference, or for an entity that the caller cannot read in the catalog are now rejected. Any Kubernetes annotations sent in the request body are ignored in favour of the ones on the catalog entity. Use the `/resources/workloads/query` endpoint instead, which has behaved this way all along.
