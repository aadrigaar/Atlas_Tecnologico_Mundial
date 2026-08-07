import { CabeceraPrincipal } from "@/components/layout/cabecera-principal";

export default function Home() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <CabeceraPrincipal />
      <main className="flex min-h-[calc(100dvh-4rem)] items-center justify-center px-6">
        <div className="space-y-3 text-center">
          <p className="text-sm font-medium tracking-[0.24em] text-muted-foreground uppercase">
            Atlas Tecnológico Mundial
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">
            La base del proyecto está lista.
          </h1>
        </div>
      </main>
    </div>
  );
}
