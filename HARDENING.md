<!-- markdownlint-disable -->

# Hardening Report: pnpm--action-setup/v4.3.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `1`

Action **pnpm--action-setup/v4.3.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### missing-permissions (severity: medium)

The workflow file .github/workflows/test.yaml has no top-level `permissions:` key and none of its jobs (test_default_inputs, test_dest, test_standalone, test_run_install) define job-level `permissions:` blocks. Without explicit permissions, the workflow inherits the repository's default token permissions, which may be overly broad (write access to contents, pull requests, etc.). A minimal permissions block (e.g., `permissions: {}` or specific read-only scopes) should be added at the top level or per job.

Locations:

- `.github/workflows/test.yaml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** missing-permissions

**Notes:**

Added `permissions: {}` at the top level of `.github/workflows/test.yaml` (after the `on:` block). The workflow only runs tests and does not require any GitHub token permissions, so an empty permissions block is the correct minimal setting. This prevents the workflow from inheriting potentially broad default repository token permissions.

