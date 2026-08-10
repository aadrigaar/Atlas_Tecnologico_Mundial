import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center bg-background p-6 text-foreground">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="flex size-14 items-center justify-center rounded-3xl border border-destructive/30 bg-destructive/10 text-destructive shadow-xl">
          <AlertCircle className="size-7" />
        </div>

        <span className="mt-4 text-xs font-bold tracking-widest text-primary uppercase">
          Error 404
        </span>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          País o página no encontrada
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          La coordenada o ruta a la que intentas acceder no existe en nuestro Atlas Tecnológico
          Mundial.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <Link href="/">
            <Button
              type="button"
              variant="default"
              size="sm"
              className="shadow-lg shadow-primary/20"
            >
              <ArrowLeft className="mr-2 size-4" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
