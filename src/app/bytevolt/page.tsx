export const dynamic = "force-dynamic";

export default function ByteVoltPage() {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="fb-api-key"      content={process.env.FIREBASE_API_KEY      ?? ""} />
        <meta name="fb-auth-domain"  content={process.env.FIREBASE_AUTH_DOMAIN  ?? ""} />
        <meta name="fb-database-url" content={process.env.FIREBASE_DATABASE_URL ?? ""} />
        <meta name="fb-project-id"   content={process.env.FIREBASE_PROJECT_ID   ?? ""} />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <iframe
          src="/bytevolt/index.html"
          style={{ width: "100%", height: "100vh", border: "none" }}
          title="ByteVolt Quiz"
        />
      </body>
    </html>
  );
}
