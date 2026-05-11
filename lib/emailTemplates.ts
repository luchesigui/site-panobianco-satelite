import { SITE_URL, WHATSAPP_PHONE } from "@/lib/constants";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface EmailParams {
  firstName: string;
  tag: string;
  headline: string;
  sub: string;
  paragraphs: string[];
  highlight?: string;
  ctaLabel: string;
  ctaHref: string;
  ctaNote: string;
  heroStyle?: string;
  tagStyle?: string;
  ctaStyle?: string;
}

interface TemplateConfig {
  subject: string;
  tag: string;
  headline: string;
  sub: string;
  paragraphs: string[];
  highlight?: string;
  ctaLabel: string;
  ctaNote: string;
  heroStyle?: string;
  tagStyle?: string;
  ctaStyle?: string;
}

type TemplateKey =
  | "lw-autoestima"
  | "lw-saude"
  | "lw-evento"
  | "lw-energia"
  | "gm-confianca"
  | "gm-superacao"
  | "gm-saude"
  | "en-trabalho"
  | "en-familia"
  | "en-autoestima"
  | "he-medico"
  | "he-longevidade"
  | "he-estresse"
  | "ebook";

// ─── HTML BUILDER ─────────────────────────────────────────────────────────────

/** Resend template variables (reserved — do not re-declare in template `variables`). */
export const RESEND_FIRST_NAME = "{{{FIRST_NAME}}}";
export const RESEND_CTA_HREF = "{{{CTA_HREF}}}";

function buildEmailHtmlInner(
  greetingName: string,
  linkHref: string,
  params: Omit<EmailParams, "firstName" | "ctaHref">,
): string {
  const {
    tag,
    headline,
    sub,
    paragraphs,
    highlight,
    ctaLabel,
    ctaNote,
    heroStyle = "background: linear-gradient(160deg, #141414 0%, #1a1008 100%);",
    tagStyle = "color: #FF6B00;",
    ctaStyle = "background: linear-gradient(135deg, #FF6B00, #FF8C00);",
  } = params;

  const paragraphsHtml = paragraphs
    .map(
      (p) =>
        `<p style="font-size:15px;line-height:1.8;color:#2A2A2A;font-family:Arial,Helvetica,sans-serif;margin:0 0 16px 0;">${p}</p>`,
    )
    .join("\n");

  const highlightHtml = highlight
    ? `<div style="background:#FFF8F0;border-left:3px solid #FF6B00;border-radius:0 8px 8px 0;padding:16px 20px;margin:24px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:#3A2A18;font-style:italic;">${highlight}</div>`
    : "";

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
</head>
<body style="margin:0;padding:0;background:#0D0D0D;font-family:Arial,Helvetica,sans-serif;">

<!-- Header -->
<div class="u-row-container" style="padding: 0; max-width: 100%; background-color: rgba(17, 17, 17, 1)">
  <div class="u-row" style="margin: 0 auto; width: 600px; max-width: 100%; min-width: 320px; overflow-wrap: break-word; background-color: rgba(0, 0, 0, 0)">
    <div style="border-collapse: collapse; display: table; width: 100%; background-color: rgba(0, 0, 0, 0)">
      <div class="u-col u-col-100" style="width: 600px; max-width: 100%; min-width: 320px; display: table-cell; vertical-align: top">
        <div style="height: 100%; width: 100% !important; padding: 30px 0; border-bottom: 4px solid rgba(255, 77, 0, 1)">
          <table cellpadding="0" cellspacing="0" width="100%" border="0" style="border-collapse: collapse; vertical-align: top">
            <tbody><tr style="vertical-align: top">
              <td align="center" style="vertical-align: top; border-collapse: collapse">
                <img width="250" src="https://w12evostorage.w12app.com.br/evo/35376/editor/2026/03/b4421da2-9a1f-426f-8ae4-22396ec87957.png" alt="Panobianco Jd. Satélite">
              </td>
            </tr></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0D0D0D;">
  <tr>
    <td align="center" style="padding:0 16px 32px;">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

        <!-- Hero -->
        <tr>
          <td style="${heroStyle} padding:48px 40px 40px;border-bottom:1px solid rgba(255,107,0,0.15);">
            <div style="display:inline-block;font-size:10px;letter-spacing:2px;${tagStyle} text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;margin-bottom:16px;font-weight:600;">${tag}</div>
            <div style="font-size:28px;line-height:1.25;color:#FAFAF8;margin-bottom:16px;letter-spacing:-0.3px;font-family:Georgia,'Times New Roman',serif;">${headline}</div>
            <div style="font-size:15px;line-height:1.75;color:rgba(240,237,232,0.65);font-family:Arial,Helvetica,sans-serif;max-width:520px;">${sub}</div>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:40px;background:#FAFAF8;">
            <p style="font-size:15px;line-height:1.8;color:#2A2A2A;font-family:Arial,Helvetica,sans-serif;margin:0 0 16px 0;">Olá, <strong style="color:#0D0D0D;font-weight:600;">${greetingName}</strong>!</p>
            ${paragraphsHtml}
            ${highlightHtml}
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:32px 40px;background:#F5F4F0;border-top:1px solid #E8E7E3;text-align:center;">
            <a href="${linkHref}" style="${ctaStyle} color:#fff;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-weight:700;font-size:15px;letter-spacing:0.3px;padding:16px 36px;border-radius:10px;display:inline-block;box-shadow:0 4px 20px rgba(255,107,0,0.35);">${ctaLabel}</a>
            <p style="margin-top:12px;font-size:12px;color:#888;font-family:Arial,Helvetica,sans-serif;">${ctaNote}</p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#0D0D0D;padding:24px 40px;">
            <p style="font-size:11px;color:rgba(255,255,255,0.25);line-height:1.7;margin:0;font-family:Arial,Helvetica,sans-serif;">
              Panobianco Jd. Satélite · São José dos Campos, SP<br>
              Você recebeu esse email porque completou nosso quiz.
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

export function buildEmailHtml(params: EmailParams): string {
  const { firstName, ctaHref, ...rest } = params;
  return buildEmailHtmlInner(firstName, ctaHref, rest);
}

/** HTML for a Resend-hosted template — uses {{{FIRST_NAME}}} and {{{CTA_HREF}}}. */
export function buildResendQuizTemplateHtml(key: TemplateKey): string {
  const tpl = TEMPLATES[key];
  const tag = tpl.tag.replaceAll("{Nome}", RESEND_FIRST_NAME);
  return buildEmailHtmlInner(RESEND_FIRST_NAME, RESEND_CTA_HREF, { ...tpl, tag });
}

/** Default subject for Resend template ({{{FIRST_NAME}}} where quiz copy used {Nome}). */
export function quizResendTemplateSubject(key: TemplateKey): string {
  return TEMPLATES[key].subject.replaceAll("{Nome}", RESEND_FIRST_NAME);
}

// ─── TEMPLATE CONTENT ────────────────────────────────────────────────────────

export const TEMPLATES: Record<TemplateKey, TemplateConfig> = {
  "lw-autoestima": {
    subject: "{Nome}, seu resultado do quiz chegou 🎯",
    tag: "Seu resultado personalizado",
    headline: "Você já sabe o que quer.<br>Agora é hora de ir buscar.",
    sub: "Você respondeu que quer se sentir bem no espelho. Esse é um objetivo poderoso porque é todos os dias.",
    paragraphs: [
      "Você completou o quiz da Panobianco Satélite e nos contou algo importante: você quer emagrecer para <strong style=\"color:#0D0D0D;font-weight:600;\">se sentir bem quando se olha no espelho</strong>.",
      "Esse tipo de motivação é o mais consistente que existe, porque não depende de uma ocasião especial. É todo dia, ao se vestir, ao sair, ao se ver em uma foto.",
      "Na Panobianco Satélite, você vai encontrar exatamente isso: <strong style=\"color:#0D0D0D;font-weight:600;\">profissionais que montam seu treino do zero</strong>, ambiente pensado pra te manter motivado(a) e uma comunidade que te leva junto.",
      "Nossa equipe está pronta pra te atender ainda essa semana, sem burocracia e sem enrolação.",
    ],
    highlight: "&ldquo;A maioria das pessoas não falha por falta de esforço. Falha por falta de estrutura e de um ambiente que as mantenha no caminho.&rdquo;",
    ctaLabel: "Falar com a equipe agora →",
    ctaNote: "Responda esse e-mail ou acesse o WhatsApp. Atendemos de segunda a sábado.",
  },

  "lw-saude": {
    subject: "{Nome}, o corpo pediu atenção. E você ouviu",
    tag: "Resultado personalizado",
    headline: "Ouvir o seu corpo<br>é o primeiro passo.",
    sub: "Você nos disse que um alerta médico te trouxe até aqui. Isso é coragem e a decisão certa.",
    paragraphs: [
      "Quando um médico ou um exame acende o sinal de alerta, é natural sentir uma mistura de preocupação e urgência. Você fez algo que muita gente não faz: <strong style=\"color:#0D0D0D;font-weight:600;\">agiu.</strong>",
      "Emagrecer por razões de saúde exige um cuidado diferente: ritmo adequado, acompanhamento profissional e um ambiente que te mantenha consistente. É exatamente isso que a Panobianco Satélite oferece.",
      "Nossa equipe vai entrar em contato para esclarecer qualquer dúvida e ajudar você a dar o próximo passo com segurança.",
    ],
    highlight: "Nossos professores trabalham com alunos em diferentes fases de saúde, do zero à alta performance. Você não vai ser tratado(a) como um número.",
    ctaLabel: "Quero começar com segurança →",
    ctaNote: "Fale com a equipe antes de decidir. Sem pressão.",
  },

  "lw-evento": {
    subject: "Tem uma data especial aí? A gente te deixa pronto(a)",
    tag: "Resultado do seu quiz",
    headline: "Tem uma data no horizonte.<br>Não deixa pra amanhã.",
    sub: "Cada semana conta. E com treino orientado desde agora, a diferença em 60 dias é real.",
    paragraphs: [
      "Você nos contou que tem <strong style=\"color:#0D0D0D;font-weight:600;\">uma data ou evento importante</strong> te motivando. Isso é ótimo. Metas com prazo real funcionam.",
      "O que fazemos: montamos um treino focado no seu objetivo com a data em mente. Sem enrolação, sem treino genérico. Você vai sentir a diferença já nas primeiras semanas.",
      "Nossa equipe entra em contato para te receber ainda essa semana. <strong style=\"color:#0D0D0D;font-weight:600;\">Quanto antes você começar, melhor o resultado.</strong>",
    ],
    highlight: "Em 4 semanas de treino consistente, a maioria dos alunos já reporta diferença visível nas roupas, mesmo antes da balança mostrar.",
    ctaLabel: "Começar antes que o tempo passe →",
    ctaNote: "Atendemos de segunda a sábado. Responda esse email ou chame no WhatsApp.",
  },

  "lw-energia": {
    subject: "{Nome}, menos peso = mais energia. Vamos começar?",
    tag: "Resultado do seu quiz",
    headline: "Dois objetivos,<br>um único treino.",
    sub: "Emagrecer e ter mais disposição andam juntos. O corpo que você quer é também o corpo que vai te dar mais energia.",
    paragraphs: [
      "Você quer emagrecer, mas o que te move de verdade é a <strong style=\"color:#0D0D0D;font-weight:600;\">energia que a gente perde quando o corpo não está bem.</strong> Isso faz todo sentido.",
      "A boa notícia: exercício aeróbico e de força combinados são a intervenção mais eficaz que existe pra aumentar disposição. Os resultados aparecem antes mesmo de mudar a balança.",
      "Na Panobianco Satélite, você vai ter um treino montado pra trabalhar os dois objetivos de forma integrada, com um professor te acompanhando desde o início.",
    ],
    ctaLabel: "Quero minha energia de volta →",
    ctaNote: "Nossa equipe entra em contato em até 24h.",
  },

  "gm-confianca": {
    subject: "{Nome}, confiança se constrói. Literalmente.",
    tag: "Resultado do seu quiz",
    headline: "O corpo muda.<br>A confiança vem junto.",
    sub: "Você quer ganhar definição pra se sentir mais confiante. Não existe objetivo mais legítimo do que esse.",
    paragraphs: [
      "Você foi direto: quer um corpo mais definido pra <strong style=\"color:#0D0D0D;font-weight:600;\">se sentir mais confiante no dia a dia</strong>. E o que a maioria não percebe é que essa confiança começa a aparecer bem antes do resultado final. Ela vem da consistência, do comprometimento, da sensação de estar evoluindo.",
      "Na Panobianco Satélite, você tem um treino com <strong style=\"color:#0D0D0D;font-weight:600;\">progressão real</strong>, acompanhado por professores que sabem quando aumentar a carga e quando recuar. Nada de ficar rodando em círculos.",
      "Nossa equipe vai entrar em contato para te receber e montar seu plano de treino inicial.",
    ],
    highlight: "Alunos que treinam com acompanhamento profissional evoluem, em média, 3x mais rápido do que quem treina sozinho.",
    ctaLabel: "Quero começar minha transformação →",
    ctaNote: "Fale com a equipe. Atendemos de segunda a sábado.",
  },

  "gm-superacao": {
    subject: "{Nome}, sua meta. Nosso método. Resultado garantido.",
    tag: "Resultado do seu quiz",
    headline: "Você traçou a meta.<br>A gente constrói o caminho.",
    sub: "Superação pessoal com treino de força é uma das combinações mais poderosas que existem. Você está no lugar certo.",
    paragraphs: [
      "Quem treina por superação pessoal é o tipo de aluno que mais evolui, porque a motivação não depende de aprovação externa. Você quer bater a sua própria meta. Isso é o que mais conta.",
      "O que a Panobianco Satélite oferece pra quem pensa assim: <strong style=\"color:#0D0D0D;font-weight:600;\">treino com progressão estruturada</strong>, onde cada semana você vê o quanto avançou. Nada de ficar no piloto automático.",
      "Nossa equipe entra em contato pra montar o seu ponto de partida. Você começa já essa semana.",
    ],
    ctaLabel: "Vamos começar →",
    ctaNote: "Responda esse email ou chame no WhatsApp.",
  },

  "gm-saude": {
    subject: "Mais músculo = mais saúde. Sério, a ciência confirma.",
    tag: "Resultado do seu quiz",
    headline: "Força não é vaidade.<br>É longevidade.",
    sub: "Você quer ganhar massa por saúde, e essa é a motivação mais inteligente que existe para treinar.",
    paragraphs: [
      "Massa muscular é um dos maiores indicadores de longevidade e qualidade de vida. Você já sabe disso. É por isso que está aqui.",
      "Na Panobianco Satélite, nossos professores montam um treino de força com foco em <strong style=\"color:#0D0D0D;font-weight:600;\">ganho funcional e saúde metabólica</strong>, não só estética. Você vai ficar mais forte, mais resistente e vai sentir a diferença no dia a dia.",
      "Nossa equipe entra em contato em breve para te apresentar a academia e tirar qualquer dúvida.",
    ],
    ctaLabel: "Quero começar a ficar mais forte →",
    ctaNote: "Nossa equipe responde em até 24h.",
  },

  "en-trabalho": {
    subject: "{Nome}, seu foco e energia podem voltar com apenas 3h por semana",
    tag: "Resultado do seu quiz",
    headline: "Foco, produtividade<br>e energia de volta.",
    sub: "Você perdeu rendimento no trabalho por falta de disposição. Exercício físico é a intervenção mais eficaz que existe pra reverter isso.",
    paragraphs: [
      "Você foi preciso: a falta de energia está afetando seu <strong style=\"color:#0D0D0D;font-weight:600;\">foco e rendimento no trabalho</strong>. Isso não é fraqueza, é fisiologia. O corpo sem atividade física fica literalmente mais lento.",
      "A boa notícia: os efeitos do treino regular na cognição e na energia aparecem rápido. Em 3 a 4 semanas, a maioria dos alunos já reporta <strong style=\"color:#0D0D0D;font-weight:600;\">mais clareza, menos fadiga e melhor humor</strong>.",
      "Nossa equipe entra em contato pra te receber e a gente começa.",
    ],
    highlight: "Você não precisa de muito tempo. Precisa de consistência. E a Panobianco Satélite está aqui pra garantir isso.",
    ctaLabel: "Quero meu foco e energia de volta →",
    ctaNote: "Atendemos de segunda a sábado.",
  },

  "en-familia": {
    subject: "{Nome}, as pessoas que você ama merecem a sua melhor versão",
    tag: "Resultado do seu quiz",
    headline: "Presente de corpo<br>e de alma.",
    sub: "Você disse que a falta de energia te afasta de quem ama. Essa é uma das razões mais poderosas pra mudar, e você já deu o primeiro passo.",
    paragraphs: [
      "Você nos contou que a falta de disposição está te impedindo de <strong style=\"color:#0D0D0D;font-weight:600;\">curtir a família e a vida social</strong> como gostaria. Isso pesa.",
      "O exercício físico regular não aumenta só a energia física, ele também melhora o humor, reduz a irritabilidade e faz você chegar em casa com mais para dar às pessoas que importam.",
      "Na Panobianco Satélite, você investe em você pra poder investir nos outros. Nossa equipe entra em contato em breve.",
    ],
    ctaLabel: "Quero estar presente de verdade →",
    ctaNote: "Fale com a equipe. Sem pressão, sem compromisso.",
  },

  "en-autoestima": {
    subject: "{Nome}, disposição e autoestima são a mesma coisa",
    tag: "Resultado do seu quiz",
    headline: "Energia alta.<br>Confiança em dia.",
    sub: "Quando o corpo funciona bem, tudo muda: a forma como você se vê, como anda, como chega nos lugares.",
    paragraphs: [
      "Você nos disse que a falta de energia te impede de <strong style=\"color:#0D0D0D;font-weight:600;\">se sentir bem e confiante</strong>. Não é coincidência: disposição e autoestima são profundamente conectadas.",
      "Treino consistente libera endorfina, melhora postura, aumenta disposição e, com o tempo, transforma a forma como você se vê. É um ciclo positivo que começa na primeira semana.",
      "Nossa equipe vai te receber e montar o melhor ponto de partida pra você.",
    ],
    ctaLabel: "Quero me sentir bem de novo →",
    ctaNote: "Nossa equipe responde em até 24h.",
  },

  "he-medico": {
    subject: "{Nome}, ouvir o médico foi a decisão mais importante que você tomou",
    tag: "Resultado do seu quiz",
    headline: "O alerta chegou.<br>Você ouviu. Isso muda tudo.",
    sub: "A maioria das pessoas ignora. Você não. E esse é o passo mais difícil, e o mais importante.",
    paragraphs: [
      "Quando um médico levanta um alerta de saúde, a janela de ação é agora. Você reconheceu isso e completou o quiz. Isso já é uma virada.",
      "Na Panobianco Satélite, trabalhamos com alunos em diferentes condições de saúde. Nossos professores respeitam o seu ritmo e montam um protocolo pensado pra <strong style=\"color:#0D0D0D;font-weight:600;\">resultados seguros e progressivos.</strong>",
      "Nossa equipe entra em contato em breve. Pode tirar todas as dúvidas antes de começar, sem compromisso.",
    ],
    highlight: "Você não precisa chegar aqui em forma. Você precisa chegar. O resto a gente constrói junto.",
    ctaLabel: "Quero cuidar da minha saúde agora →",
    ctaNote: "Atendemos de segunda a sábado. Fale com a equipe sem pressão.",
  },

  "he-longevidade": {
    subject: "{Nome}, daqui a 10 anos você vai agradecer a decisão de hoje",
    tag: "Resultado do seu quiz",
    headline: "Envelhecer bem<br>começa agora.",
    sub: "Qualidade de vida não é sorte. É consequência de hábitos construídos hoje.",
    paragraphs: [
      "Você pensa no longo prazo, e isso é raro. A maioria das pessoas só age quando o problema já chegou. Você está agindo antes.",
      "Exercício físico regular é o hábito com o maior retorno comprovado para longevidade, mobilidade e qualidade de vida. E quanto mais cedo começa, ou recomeça, melhor.",
      "Na Panobianco Satélite, você vai encontrar um ambiente e uma equipe que constroem esse hábito com você, de forma sustentável.",
    ],
    ctaLabel: "Investir em mim a longo prazo →",
    ctaNote: "Nossa equipe entra em contato em até 24h.",
  },

  "he-estresse": {
    subject: "{Nome}, academia é o melhor antídoto pro estresse que existe",
    tag: "Resultado do seu quiz",
    headline: "Levante o peso.<br>Deixe o estresse no chão.",
    sub: "Exercício físico reduz cortisol, melhora o sono e regula o humor. Em semanas, não meses.",
    paragraphs: [
      "Você nos contou que o estresse e a ansiedade estão te afetando. Isso é mais comum do que parece, e o exercício físico é uma das intervenções mais eficazes e rápidas pra isso.",
      "O treino funciona como uma válvula de escape que tem efeito fisiológico real: reduz cortisol, libera endorfina, melhora o sono. Não é só motivação, é bioquímica.",
      "Na Panobianco Satélite, você vai ter um espaço que é só seu, pra descarregar, focar e sair melhor do que entrou.",
    ],
    ctaLabel: "Quero um espaço pra cuidar de mim →",
    ctaNote: "Nossa equipe entra em contato em breve.",
  },

  ebook: {
    subject: "{Nome}, aqui estamos 🧡",
    tag: "Para {Nome}",
    headline: "O começo não precisa<br>ser perfeito. Só precisa ser.",
    sub: "Você deu um sinal importante ao chegar até aqui. Nosso time está do seu lado, independente do momento.",
    paragraphs: [
      "A gente entende que nem sempre o momento financeiro permite. E respeita muito isso.",
      "O que importa é que você respondeu o quiz, o que significa que a vontade de mudar está lá. E isso é o que faz toda a diferença.",
      "Estamos em contato para te passar os detalhes do e-book <strong style=\"color:#0D0D0D;font-weight:600;\">&ldquo;Comece Agora: Treino em Casa + Alimentação Saudável&rdquo;</strong>, por R$ 19,90 — um primeiro passo concreto pra sair do lugar enquanto o momento não permite mais.",
    ],
    highlight: "E quando as coisas melhorarem e você quiser dar o próximo nível, a Panobianco Satélite vai estar esperando por você, com braços abertos e uma oferta especial pra quem já é da família.",
    ctaLabel: "Quero o e-book por R$ 19,90 →",
    ctaNote: "Pagamento único. Entregue por email após confirmação.",
  },
};

// ─── SELECTORS ───────────────────────────────────────────────────────────────

export function selectTemplate(
  goal: string,
  plan: string,
  loseWeightWhy?: string,
  muscleWhy?: string,
  energyMissing?: string,
  healthMotivation?: string,
): TemplateKey {
  if (plan === "too_expensive") return "ebook";

  if (goal === "lose_weight") {
    if (loseWeightWhy === "health_alert") return "lw-saude";
    if (loseWeightWhy === "event") return "lw-evento";
    if (loseWeightWhy === "energy") return "lw-energia";
    return "lw-autoestima";
  }

  if (goal === "gain_muscle") {
    if (muscleWhy === "personal") return "gm-superacao";
    if (muscleWhy === "strength" || muscleWhy === "social") return "gm-saude";
    return "gm-confianca";
  }

  if (goal === "energy") {
    if (energyMissing === "social") return "en-familia";
    if (energyMissing === "self" || energyMissing === "hobbies") return "en-autoestima";
    return "en-trabalho";
  }

  if (goal === "health") {
    if (healthMotivation === "longevity") return "he-longevidade";
    if (healthMotivation === "stress") return "he-estresse";
    return "he-medico";
  }

  return "lw-autoestima";
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? SITE_URL;

export function selectCtaHref(plan: string): string {
  if (plan === "orange") return `${BASE_URL}/checkout/orange`;
  if (plan === "platinum_rec") return `${BASE_URL}/checkout/platinum`;
  if (plan === "platinum_month") {
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Olá! Vim pelo quiz e gostaria de assinar o Plano Platinum Mensal.")}`;
  }
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Olá! Vi o e-book no quiz e gostaria de mais informações.")}`;
}
