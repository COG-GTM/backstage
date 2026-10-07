---
id: permissions
title: Permissions
description: Configuring permissions for Kubernetes plugin
---

The Kubernetes plugin integrates with the permission framework. Administrators can define PermissionPolicies
to restrict access to the `/clusters`, `/services/:serviceId`, `/resources` and `/proxy` endpoints.

This feature assumes your Backstage instance has enabled the [permissions framework](https://backstage.io/docs/permissions/getting-started).

### Available permissions

| Name                      | Policy | Description                                                                                                                               |
| ------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| kubernetes.clusters.read  | read   | Allows the user to read Kubernetes clusters information under `/clusters`                                                                 |
| kubernetes.resources.read | read   | Allows the user to read Kubernetes resources information under `/services/:serviceId` and `/resources`                                    |
| kubernetes.proxy          |        | Allows the user to make arbitrary requests to the [REST API](https://kubernetes.io/docs/reference/using-api/api-concepts/) under `/proxy` |

### Restricting proxy access to specific clusters

`kubernetes.proxy` is a resource permission for the `kubernetes-cluster` resource type. The resource is the cluster selected by the `Backstage-Kubernetes-Cluster` header. The check runs before the backend attaches any cluster credentials to the request.

Return a conditional decision with the `IS_CLUSTER_NAME` rule to limit which clusters a user can reach through the proxy:

```typescript
import { kubernetesProxyPermission } from '@backstage/plugin-kubernetes-common';
import {
  createKubernetesClusterConditionalDecision,
  kubernetesClusterConditions,
} from '@backstage/plugin-kubernetes-backend';
import { isPermission } from '@backstage/plugin-permission-common';

// inside your PermissionPolicy handle() method
if (isPermission(request.permission, kubernetesProxyPermission)) {
  return createKubernetesClusterConditionalDecision(
    request.permission,
    kubernetesClusterConditions.isClusterName({
      clusterNames: ['dev-cluster'],
    }),
  );
}
```

Requests to any other cluster get a `403` response. A policy that returns `ALLOW` for `kubernetes.proxy`, such as the allow-all policy, still allows access to every configured cluster.
