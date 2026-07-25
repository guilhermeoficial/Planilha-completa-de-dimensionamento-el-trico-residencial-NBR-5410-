import { verificarAssinatura } from "@/lib/verificar-assinatura";

export default async function PaidLayout({ children }: { children: React.ReactNode }) {
  await verificarAssinatura();
  return <>{children}</>;
}
