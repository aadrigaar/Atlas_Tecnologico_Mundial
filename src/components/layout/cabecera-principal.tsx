import Link from "next/link";
import { Globe, MapPin } from "lucide-react";

export function CabeceraPrincipal() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Ir al inicio">
          <span className="flex size-9 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
            <Globe className="size-4" aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-tight text-foreground">Atlas</span>
            <span className="mt-1 text-[0.65rem] font-medium tracking-[0.16em] text-muted-foreground uppercase">
              Tecnológico Mundial
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs font-medium text-muted-foreground">
          <MapPin className="size-3.5 text-primary" aria-hidden="true" />
          <span className="hidden sm:inline">Explorador global</span>
        </div>
      </div>
    </header>
  );
}
