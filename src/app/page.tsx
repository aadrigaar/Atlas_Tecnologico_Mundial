import { CabeceraPrincipal } from "@/components/layout/cabecera-principal";
import { PanelExplorador } from "@/components/layout/panel-explorador";

export default function Home() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <CabeceraPrincipal />
      <main className="min-h-[calc(100dvh-4rem)] md:flex">
        <PanelExplorador />
        <section className="flex min-h-[32rem] flex-1 items-center justify-center px-6">
          <div className="space-y-3 text-center">
            <p className="text-sm font-medium tracking-[0.24em] text-muted-foreground uppercase">
              Atlas Tecnológico Mundial
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">
              El mapa interactivo se incorporará aquí.
            </h1>
          </div>
        </section>
      </main>
    </div>
  );
}
