import { notFound } from "next/navigation";
import { buscarArea, buscarModulo } from "@/lib/cursos-data";
import ModuloLeitor from "./modulo-leitor";

export default async function ModuloPage({ params }: { params: Promise<{ area: string; modulo: string }> }) {
  const { area: areaSlug, modulo: moduloSlug } = await params;
  const area = buscarArea(areaSlug);
  const modulo = buscarModulo(areaSlug, moduloSlug);
  if (!area || !modulo) notFound();

  return <ModuloLeitor areaSlug={area.slug} areaNome={area.nome} modulo={modulo} />;
}
