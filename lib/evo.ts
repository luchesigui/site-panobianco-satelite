export async function createCheckoutLink(plan: "orange" | "platinum"): Promise<string> {
  const membershipIds = {
    orange: Number(process.env.EVO_MEMBERSHIP_ID_ORANGE),
    platinum: Number(process.env.EVO_MEMBERSHIP_ID_PLATINUM),
  };
  const credentials = Buffer.from(
    `${process.env.EVO_DNS}:${process.env.EVO_TOKEN}`,
  ).toString("base64");

  const res = await fetch("https://evo-integracao-api.w12app.com.br/api/v1/carts", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idBranch: Number(process.env.EVO_BRANCH_ID),
      items: [{ idMembership: membershipIds[plan] }],
    }),
  });

  if (!res.ok) throw new Error(`EVO API error: ${res.status}`);
  const data = await res.json();
  if (!data.cartCheckoutLink) throw new Error("No cartCheckoutLink in EVO response");
  return data.cartCheckoutLink as string;
}
