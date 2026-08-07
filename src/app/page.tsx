import { CabeceraPrincipal } from "@/components/layout/cabecera-principal";
import { PanelExplorador } from "@/components/layout/panel-explorador";
import { MapaMundial } from "@/components/mapa/mapa-mundial";

export default function Home() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <CabeceraPrincipal />
      <main className="min-h-[calc(100dvh-4rem)] md:flex">
        <PanelExplorador />
        <section className="min-h-[32rem] flex-1">
          <MapaMundial />
        </section>
      </main>
    </div>
  );
}
