---
'@backstage/plugin-kubernetes-backend': minor
---

The `/proxy` endpoint now checks the `kubernetes.proxy` permission against the cluster selected by the `Backstage-Kubernetes-Cluster` header, before any cluster credentials are attached to the request. Requests to a cluster the caller is not allowed to reach get a `403` response. Policies can return a conditional decision using the new `IS_CLUSTER_NAME` rule, with the exported `kubernetesClusterConditions` and `createKubernetesClusterConditionalDecision` helpers, to limit which clusters each user can proxy to.
