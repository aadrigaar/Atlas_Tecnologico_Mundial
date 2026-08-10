import { Globe } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center bg-background p-6 text-foreground">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative flex size-16 items-center justify-center rounded-3xl border border-primary/40 bg-primary/10 text-primary shadow-2xl shadow-primary/20 animate-pulse">
          <Globe className="size-8 animate-spin" style={{ animationDuration: "6s" }} />
        </div>

        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Atlas Tecnológico Mundial
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Cargando mapas coropléticos, datos de salarios y ecosistemas globales...
          </p>
        </div>

        {/* Skeleton Bar */}
        <div className="mt-4 h-1.5 w-48 overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-2/3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </div>
  );
}
