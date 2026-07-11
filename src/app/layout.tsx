import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Voltis — Plataforma de Estudos para Concursos de Eletrotécnica",
  description: "Prepare-se para os concursos da Petrobras Ênfase 5 e 6. Banco de questões inéditas, cursos completos de Eletrotécnica e Instrumentação, estatísticas de desempenho e gabarito comentado.",
  keywords: ["Voltis", "concurso Petrobras", "eletrotécnica", "instrumentação", "questões Petrobras", "Ênfase 5", "Ênfase 6", "técnico manutenção elétrica", "estudos eletrotécnica", "banco de questões"],
  authors: [{ name: "Voltis" }],
  creator: "Voltis",
  publisher: "Voltis",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://voltis.net.br",
    siteName: "Voltis",
    title: "Voltis — Plataforma de Estudos para Concursos de Eletrotécnica",
    description: "Prepare-se para os concursos da Petrobras Ênfase 5 e 6 com questões inéditas, cursos completos e gabarito comentado.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voltis — Estudos para Concursos de Eletrotécnica",
    description: "Banco de questões e cursos para Petrobras Ênfase 5 e 6.",
  },
  alternates: {
    canonical: "https://voltis.net.br",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text">{children}</body>
    </html>
  );
}

