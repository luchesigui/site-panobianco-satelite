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
GitHub run 42848219123, attempt 3, completed successfully on hosted Ubuntu. After the user corrected RESEND_API_KEY, the provider accepted the credential but rejected the original sender domain as unverified (HTTP403). RAFFLE_EMAIL_FROM was switched to the test-only sender onboarding@resend.dev. The exact TESTE message was then found in the authorized Gmail inbox, exported as MIME, and verified to contain the fictitious winner, internal details, all three guide steps and the MP4 attachment. The received attachment passed FFprobe: H264, 1080x1920, 30fps, 12.633333 seconds, 812162 bytes; sampled frames passed visual QA. Inbox summary incorrectly reported has_attachment=false, so MIME inspection was required. This proves mock cloud rendering and actual email delivery, not production scheduling or a live draw. Before branded production sending, configure a Resend-verified sender/domain. Draft PR: https://github.com/luchesigui/site-panobianco-satelite/pull/21.

## Production gates still outstanding
1. Persistent authorized draw/result checkpoint before rendering, with same-period locking and crash recovery.
2. Separate retry of an existing result, never a new draw after an export/email failure.
3. Confirm the Sunday delivery time in America/Sao_Paulo and authorize production cutover.
4. Add schedule plus missed-run alert. Disable the old local job at the coordinated cutover, not before cloud acceptance.
5. Obtain independent spec and code-quality reviews. Delegated reviewers are presently blocked by provider HTTP402.

Do not enable production by merely adding a cron trigger to the acceptance workflow. It is a mock-only test, not the production raffle runner.
