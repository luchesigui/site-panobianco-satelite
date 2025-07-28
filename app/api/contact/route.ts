import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend('re_N5qmWpsV_6L8h6pXSLswqhfjAjrqhX6ff')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nome, email, telefone, assunto, mensagem } = body

    // Validate required fields
    if (!nome || !email || !mensagem) {
      return NextResponse.json(
        { error: 'Nome, email e mensagem são obrigatórios' },
        { status: 400 }
      )
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'contato@panobiancosatelite.com.br', // You may need to verify this domain with Resend
      to: ['contato@panobiancosatelite.com.br'], // Replace with the gym's email
      subject: assunto || 'Nova mensagem do site',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f97316;">Nova mensagem do site - Academia Panobianco</h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Dados do contato:</h3>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${telefone ? `<p><strong>Telefone:</strong> ${telefone}</p>` : ''}
            ${assunto ? `<p><strong>Assunto:</strong> ${assunto}</p>` : ''}
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #f97316; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Mensagem:</h3>
            <p style="line-height: 1.6;">${mensagem.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>Esta mensagem foi enviada através do formulário de contato do site da Academia Panobianco.</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ message: 'Email enviado com sucesso!', data })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor. Tente novamente mais tarde.' },
      { status: 500 }
    )
  }
}