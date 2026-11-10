export async function sendRaffleEmail({ apiKey, payload, idempotencyKey, fetchImpl = fetch }) {
  if (!apiKey || !/^[a-zA-Z0-9_-]{1,200}$/.test(idempotencyKey || '')) {
    throw new Error('Missing email configuration or invalid run key.');
  }
  let response;
  try {
    response = await fetchImpl('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(60_000),
    });
  } catch {
    throw new Error('Email delivery status unknown; do not redraw.');
  }
  if (!response.ok) {
    const detail = await response.json().catch(() => ({}));
    const reason = String(detail.message || '');
    const error = new Error(`Email provider rejected request (HTTP ${response.status}); do not redraw.`);
    error.code = `MAIL_HTTP_${response.status}`;
    error.safeReason = /domain.*not verified/i.test(reason) ? 'SENDER_DOMAIN_NOT_VERIFIED'
      : /API key is invalid|invalid api key/i.test(reason) ? 'API_KEY_INVALID'
      : /only send testing emails/i.test(reason) ? 'TEST_RECIPIENT_RESTRICTION'
      : /idempotenc|same.*key/i.test(reason) ? 'IDEMPOTENCY_CONFLICT'
      : /restricted.*domain|not.*permission|not authorized/i.test(reason) ? 'KEY_PERMISSION_RESTRICTION'
      : 'PROVIDER_REJECTION';
    throw error;
  }
  const result = await response.json();
  if (!result.id) throw new Error('Email provider returned no receipt; do not redraw.');
  return result.id;
}

export function buildRaffleEmail({ winner, video, from, to, mode }) {
  if (!['mock', 'live'].includes(mode)) throw new Error('Invalid raffle email mode.');
  if (typeof winner?.name !== 'string' || !winner.name.trim() || !Number.isSafeInteger(winner.id) || winner.id < 1) throw new Error('Invalid winner details.');
  if (!Buffer.isBuffer(video) || !video.length || video.length > 18 * 1024 * 1024) throw new Error('Video missing or exceeds attachment limit.');
  if (![from, to].every(value => typeof value === 'string' && !/[\r\n]/.test(value) && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value.match(/<([^<>]+)>$/)?.[1] || value))) throw new Error('Invalid email address.');
  return {
    from,
    to: [to],
    subject: `${mode === 'mock' ? '[TESTE] ' : ''}Resultado do sorteio semanal Panobianco`,
    text: [
      mode === 'mock' ? 'TESTE de automação com vencedor fictício. Não publicar.' : 'Sorteio da semana concluído.',
      '', `Aluno: ${winner.name}`, `ID do aluno: ${winner.id}`, '',
      'Passo a passo:',
      '1. Baixar o vídeo anexo e publicar nos stories.',
      '2. Adicionar o story aos destaques do Instagram.',
      '3. Enviar os dados do ganhador no grupo interno da equipe e combinar o contato com o aluno.',
      '', 'O ID do aluno é interno. Não publicar o ID nem encaminhar este email publicamente.',
    ].join('\n'),
    attachments: [{ filename: 'sorteio-semanal-reels.mp4', content: video.toString('base64') }],
  };
}
