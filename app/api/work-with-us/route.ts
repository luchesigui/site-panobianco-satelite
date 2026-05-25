import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

import { CONTACT_EMAIL } from "@/lib/constants";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const nome = formData.get("nome") as string;
    const email = formData.get("email") as string;
    const telefone = formData.get("telefone") as string;
    const area = formData.get("area") as string;
    const curriculo = formData.get("curriculo") as File | null;

    // Validate required fields
    if (!nome || !email || !telefone || !area || !curriculo) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios, incluindo o currículo." },
        { status: 400 }
      );
    }

    // Validate file
    if (curriculo.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "O currículo deve ter no máximo 5MB." },
        { status: 400 }
      );
    }

    const ext = curriculo.name.split(".").pop()?.toLowerCase();
    const isAllowedExt = ext && ["pdf", "doc", "docx"].includes(ext);
    const isAllowedMime = ALLOWED_TYPES.includes(curriculo.type);

    if (!isAllowedExt && !isAllowedMime) {
      return NextResponse.json(
        { error: "Formato inválido. Envie um arquivo PDF, DOC ou DOCX." },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json(
        {
          error:
            "Serviço de email não configurado. Tente novamente mais tarde.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Convert file to base64 for Resend attachment
    const fileBuffer = await curriculo.arrayBuffer();
    const fileBase64 = Buffer.from(fileBuffer).toString("base64");

    const data = await resend.emails.send({
      from: `Panobianco Website <${CONTACT_EMAIL}>`,
      to: ["sjc.satelite@panobiancoacademia.com.br"],
      subject: `Novo candidato: ${nome}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f97316;">Novo currículo recebido - Panobianco</h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Dados do candidato:</h3>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${telefone}</p>
            <p><strong>Área de Interesse:</strong> ${area}</p>
            <p><strong>Currículo:</strong> ${curriculo.name} (${(curriculo.size / 1024).toFixed(1)} KB)</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>Este currículo foi enviado através do formulário "Trabalhe Conosco" do site da Academia Panobianco.</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: curriculo.name,
          content: fileBase64,
          contentType: curriculo.type,
        },
      ],
    });

    return NextResponse.json({ message: "Currículo enviado com sucesso!", data });
  } catch (error) {
    console.error("Error sending resume email:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
