---
'@backstage/plugin-auth-node': patch
---

Fixed an open redirect in the OAuth callback handler. The redirect target supplied through the OAuth `state` is now validated against the configured origin allow-list (and restricted to http/https) on both the success and error paths, so authentication flows can no longer be used to bounce users to arbitrary external sites.
