---
'@backstage/plugin-kubernetes-common': minor
---

**BREAKING**: The `kubernetes.proxy` permission is now a resource permission for the new `kubernetes-cluster` resource type, where the resource is the cluster targeted by the proxied request. Permission policies can now restrict proxy access to specific clusters. Policies that return `ALLOW` or `DENY` for this permission keep working as before. Code that called `authorize` with this permission must now pass the cluster name as `resourceRef`, or use `authorizeConditional`.
