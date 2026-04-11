import type { Metadata } from "next";
import { cookies } from "next/headers";

import TreinamentoLoginForm from "./TreinamentoLoginForm";

export const metadata: Metadata = {
  title: "Treinamento",
  description:
    "Vídeos de treinamento interno da equipe Academia Panobianco Jardim Satélite.",
  robots: { index: false, follow: false },
};

const VIDEOS = [
  {
    title: "Como cadastrar uma oportunidade",
    id: "IPGoLj_MKdc",
  },
  {
    title: "Fluxo básico de atendimento",
    id: "w4Ds9BkyjHg",
  },
  {
    title: "Atendimentos em Atenção",
    id: "UCBD5dSXTb0",
  },
  {
    title: "Follow Up",
    id: "l5Xn2UYxdFY",
  },
  {
    title: "Enviando mensagem para lead recém criado",
    id: "l5T88AUBbkU",
  },
] as const;

const IFRAME_ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

export default function TreinamentoPage() {
  const authorized = cookies().get("isAuthorized")?.value === "1";

  return (
    <div className="font-display min-h-screen bg-background-dark text-white antialiased overflow-x-hidden">
      <section className="relative border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent">
        <div className="container-main py-12 md:py-16">
          <h1 className="text-4xl font-black leading-tight md:text-5xl">
            Treinamento <span className="text-primary-500">em vídeo</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/65 md:text-base">
            Materiais de apoio para o time. Esta área é restrita.
          </p>
        </div>
      </section>

      <section className="container-main py-12">
        {authorized ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-8">
            {VIDEOS.map((video) => (
              <div key={video.id} className="flex min-w-0 flex-col gap-4">
                <h2 className="text-lg font-bold leading-snug lg:text-xl">
                  {video.title}
                </h2>
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black">
                  <iframe
                    title={video.title}
                    src={`https://www.youtube.com/embed/${video.id}`}
                    allow={IFRAME_ALLOW}
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8">
            <div className="min-w-0 lg:col-start-2">
              <TreinamentoLoginForm />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
