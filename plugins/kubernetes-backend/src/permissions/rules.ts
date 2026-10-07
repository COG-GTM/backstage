/*
 * Copyright 2026 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { RESOURCE_TYPE_KUBERNETES_CLUSTER } from '@backstage/plugin-kubernetes-common';
import { ClusterDetails } from '@backstage/plugin-kubernetes-node';
import {
  createPermissionResourceRef,
  createPermissionRule,
} from '@backstage/plugin-permission-node';
import { z } from 'zod/v3';

/**
 * Permission resource ref for Kubernetes clusters, keyed by cluster name.
 * @public
 */
export const kubernetesClusterPermissionResourceRef =
  createPermissionResourceRef<ClusterDetails, never>().with({
    pluginId: 'kubernetes',
    resourceType: RESOURCE_TYPE_KUBERNETES_CLUSTER,
  });

/**
 * A {@link @backstage/plugin-permission-node#PermissionRule} which matches
 * Kubernetes clusters with one of the given names.
 * @public
 */
export const isClusterName = createPermissionRule({
  name: 'IS_CLUSTER_NAME',
  description: 'Allow Kubernetes clusters with one of the given names',
  resourceRef: kubernetesClusterPermissionResourceRef,
  paramsSchema: z.object({
    clusterNames: z
      .array(z.string())
      .describe('List of cluster names to match at least one of'),
  }),
  apply: (cluster, { clusterNames }) => clusterNames.includes(cluster.name),
  toQuery: () => {
    throw new Error('IS_CLUSTER_NAME does not support query filtering');
  },
});

/**
 * Permission rules available for Kubernetes clusters.
 * @public
 */
export const kubernetesClusterPermissionRules = { isClusterName };
