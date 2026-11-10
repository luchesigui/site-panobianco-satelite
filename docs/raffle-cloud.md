# Weekly raffle on GitHub Actions

## Schedule and cutover gate
`weekly-raffle.yml` defines Sunday 11:00 America/Sao_Paulo for the real weekly draw and Sunday 12:30 for a delivery watchdog. GitHub schedules are best effort and may be delayed or dropped. The watchdog is also best effort; native GitHub run notifications remain a fallback.

Because GitHub disables scheduled workflows in public repositories after 60 days of inactivity, an isolated scheduled keepalive job checks the last main commit. Only after 28 days without source activity does it add an empty same-tree commit, with a non-forced ref update and readback. It changes no application files, has no EVO/email/state credentials, and alone receives contents-write permission. Concurrent user pushes are never overwritten.

Scheduled jobs are gated by the repository Actions variable `RAFFLE_PRODUCTION_ENABLED=true`. Keep it unset/false until cloud acceptance and independent reviews pass. At cutover, pause the old local Hermes weekly raffle job, verify it is paused, then enable the variable and verify it remotely. Never leave both schedulers enabled. Do not fire a new live draw merely to test cutover.

The application source stays in this public repository. Only operational state lives in `luchesigui/panobianco-raffle-state`, which must remain private. The runner refuses an unexpected state remote or a repository visible through the unauthenticated public API.

## State and recovery
Each Sunday has one branch `live-YYYY-MM-DD` in the private state repository. Branch creation uses an explicit empty-ref force-with-lease, and updates use the exact prior SHA. A unique transaction commit prevents identical writes from accidentally being treated as an already-up-to-date push. Every write is read back before continuing.

Lifecycle:
1. Load the complete fresh eligible pool with the existing EVO exclusion rules. Any incomplete, malformed or failed pagination aborts without a result.
2. Atomically claim the period. Only the claim owner can select with Node crypto.randomInt.
3. Save the selected winner and minimal participant snapshot before rendering.
4. Render from that saved snapshot through local CDP interception. The capture page selects the saved member ID, not the display name. It cannot choose a new random winner during replay or call the participant API.
5. Verify correct winner ID plus H264, 1080x1920, 30fps and minimum duration.
6. Save the exact email payload including the MP4 before sending. The email contains the winner details and the three publishing instructions.
7. Mark sending, call Resend using the period as its idempotency key, then save the receipt as sent.

A retry after a render failure uses the saved snapshot. A retry after an uncertain send uses the byte-identical payload and same provider idempotency key, only within a conservative 23-hour window. Older uncertain sends stop for human inbox inspection. A sent period is skipped. An ambiguous claimed period stops for manual investigation. Never delete a period branch, clear its state, or rerun a different period to bypass these protections.

Recovery cannot create a new result:
    gh workflow run weekly-raffle.yml -f mode=recover -f period=YYYY-MM-DD

If a claimed checkpoint is ambiguous or a sending checkpoint is older than 23 hours, inspect the private record, provider receipt and actual inbox before any repair. Escalate rather than forcing a new draw. A rollback must also inspect the current Sunday state before resuming the old local job.

## Modes
- schedule at 11:00: live draw, only on main and on Sunday in Sao Paulo.
- schedule at 12:30: watchdog; sends an alert if no sent checkpoint exists, never draws.
- workflow_dispatch mock: isolated fictional result and TESTE email, no EVO fetch. Runs twice in one job to prove the second invocation skips the sent checkpoint.
- workflow_dispatch preflight: complete fresh EVO pool check; prints only its count, no selection/state mutation/email.
- workflow_dispatch recover: resume an existing Sunday result only.

Failures in live/recovery/watchdog attempt an internal alert email without member information. If the email provider itself is unavailable, the failed GitHub run remains the diagnostic source. No participant list, winner ID or email payload is printed in public logs or uploaded as a public artifact.

## Configuration
Actions secrets in the source repository:
- EVO_DNS, EVO_TOKEN, EVO_BRANCH_ID: existing EVO eligibility integration.
- RESEND_API_KEY: mail-provider credential.
- RAFFLE_EMAIL_FROM, RAFFLE_EMAIL_TO: authorized sender/recipient.
- RAFFLE_STATE_SSH_KEY: write-enabled deploy key scoped ONLY to the private state repository, not a broad GitHub account token.

The current `onboarding@resend.dev` sender delivers only to the email associated with the Resend account. This is a provisional account-owner-only route, not a branded or general-recipient sender. Verify a domain in Resend before changing recipients or using a branded sender. Do not label real results as TESTE; only mock emails carry that label.

Chromium runs headlessly on hosted Ubuntu with CAPTURE_CHROME_BINARY=/usr/bin/google-chrome. Run media and browser profile use runner temporary storage and are cleaned in finally. The private result repository retains the operational snapshot, exact payload and receipt so recovery never needs a new draw; keep repository access restricted and review retention separately.

## Verification
Unit/state tests:
    node --test scripts/raffle-*.test.mjs scripts/sorteio-cdp.test.mjs scripts/sorteio-capture-guard.test.mjs scripts/sorteio-result.test.mjs scripts/sorteio-video.test.mjs

Real replay integration, with the local raffle site running, no live draw/email:
    RAFFLE_INTEGRATION=1 node --test scripts/raffle-replay.integration.test.mjs

Entrypoint check, no draw/email:
    node scripts/raffle-weekly-cloud.mjs --check

Acceptance requires the exact received TESTE message, guide, fictional winner and attached MP4. Export MIME even if the inbox summary says has_attachment=false. Decode the received MP4, run FFprobe and inspect sampled frames. Provider acceptance alone is not delivery proof.

The legacy `raffle-cloud-acceptance.yml` remains manual and mock-only. It is not the weekly production workflow.

## Initial evidence
The original mock-only hosted acceptance run 42848219123 attempt 3 succeeded; its exact received attachment passed FFprobe and visual QA. The production-runner path, private checkpoints, second-invocation skip, cloud EVO preflight and final cutover require their own verification before enabling the gate.
