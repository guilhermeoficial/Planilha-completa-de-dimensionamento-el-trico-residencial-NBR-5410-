import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ByteVoltPage() {
  // Página pública — o jogo funciona só com apelido + PIN da sala,
  // não depende de conta/login. Isso evita que uma turma inteira
  // tentando cadastrar ao mesmo tempo esbarre no limite de e-mails
  // de confirmação do Supabase.

  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ByteVolt — Quiz ao Vivo</title>
      </head>
      <body style={{ margin: 0, padding: 0, background: "#070d17" }}>
        {/* Barra de navegação */}
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "8px 16px", height: 40,
          background: "rgba(7,13,23,0.95)", backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(204,154,63,0.18)",
        }}>
          <Link href="/dashboard" style={{
            display: "flex", alignItems: "center", gap: 8,
            color: "#edf1f7", textDecoration: "none", fontSize: 13, fontWeight: 700, fontFamily: "'Source Serif 4', Georgia, serif",
          }}>
            <span style={{ display:"inline-block", width:8, height:8, borderRadius:"50%", background:"#cc9a3f" }} />
            Voltis
          </Link>
          <span style={{ color: "#cc9a3f", fontWeight: 800, fontSize: 14, letterSpacing: 1 }}>
            ⚡ ByteVolt
          </span>
          <Link href="/dashboard" style={{ color: "#8b98b0", textDecoration: "none", fontSize: 12 }}>
            ← Dashboard
          </Link>
        </div>

        <iframe
          src="/bytevolt/index.html"
          style={{ width: "100%", height: "100vh", border: "none", display: "block" }}
          title="ByteVolt Quiz"
        />
      </body>
    </html>
  );
}
