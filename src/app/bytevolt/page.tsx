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
      <body style={{ margin: 0, padding: 0, background: "#10141c" }}>
        {/* Barra de navegação */}
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "8px 16px", height: 40,
          background: "rgba(16,20,28,0.95)", backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}>
          <Link href="/dashboard" style={{
            display: "flex", alignItems: "center", gap: 8,
            color: "#eef1f6", textDecoration: "none", fontSize: 13, fontWeight: 700,
          }}>
            <span style={{ display:"inline-block", width:8, height:8, borderRadius:"50%", background:"#f2a33d" }} />
            Voltis
          </Link>
          <span style={{ color: "#ffcc33", fontWeight: 800, fontSize: 14, letterSpacing: 1 }}>
            ⚡ ByteVolt
          </span>
          <Link href="/dashboard" style={{ color: "#93a0b4", textDecoration: "none", fontSize: 12 }}>
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
