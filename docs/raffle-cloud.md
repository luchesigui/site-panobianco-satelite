# Raffle cloud migration

## Current scope
The cloud acceptance workflow renders and emails a clearly fictional result. It cannot perform a live draw, receives no EVO credentials, and has no production schedule. The existing local weekly job is unchanged.

## Email acceptance
The recipient must receive a TESTE email containing the fictitious winner, three publishing instructions, and an attached 1080x1920 H.264 MP4. Provider acceptance is not inbox verification. Confirm the actual received message and attachment before declaring success.

## Configuration
Repository Actions secrets:
- RESEND_API_KEY: portable mail-provider credential.
- RAFFLE_EMAIL_FROM: sender authorized by Resend.
- RAFFLE_EMAIL_TO: authorized recipient.

The acceptance runner explicitly sets CAPTURE_MOCK=1, CAPTURE_FORMAT=reels, and the fictitious capture winner. It checks the video with FFprobe before sending. It never retries a draw or email. The provider idempotency key is based on the workflow run ID. Rerunning the same run preserves that key; rerendering may change the attachment, so an idempotency mismatch must be investigated, not bypassed automatically.

## Running
The first migration branch push triggers the acceptance workflow. Once merged into the default branch it is also available through Run workflow. A push or manual run sends a TESTE email; do not treat it as a production result.

Local tests:
    node --test scripts/raffle-email.test.mjs scripts/raffle-cloud-mock.test.mjs scripts/sorteio-cdp.test.mjs scripts/sorteio-capture-guard.test.mjs scripts/sorteio-result.test.mjs scripts/sorteio-video.test.mjs

Entrypoint preflight (no email, no draw):
    node scripts/raffle-cloud-mock.mjs --check

Actual acceptance requires the local raffle page, Chromium, FFmpeg/FFprobe, and the above configuration. Linux browser is selected with CAPTURE_CHROME_BINARY=/usr/bin/google-chrome. Temporary files are deleted in finally. Logs do not contain internal winner details or email payloads.

## Cloud acceptance result
GitHub run 42843493361 executed on hosted Ubuntu and successfully rendered/FFprobe-validated a 1080x1920 H.264 30fps mock video (11.966667 seconds, 738766 bytes). Email delivery failed. A separate provider request confirmed the currently available RESEND_API_KEY is invalid (HTTP 400 validation_error). The configured GitHub secret needs to be replaced through repository Settings > Secrets and variables > Actions; never paste the key into chat or commit it. No email receipt or attachment acceptance has been verified yet. Draft PR: https://github.com/luchesigui/site-panobianco-satelite/pull/21.

## Production gates still outstanding
1. Persistent authorized draw/result checkpoint before rendering, with same-period locking and crash recovery.
2. Separate retry of an existing result, never a new draw after an export/email failure.
3. Confirm the Sunday delivery time in America/Sao_Paulo and authorize production cutover.
4. Add schedule plus missed-run alert. Disable the old local job at the coordinated cutover, not before cloud acceptance.
5. Obtain independent spec and code-quality reviews. Delegated reviewers are presently blocked by provider HTTP402.

Do not enable production by merely adding a cron trigger to the acceptance workflow. It is a mock-only test, not the production raffle runner.
