import { BarChart3, Building2, CircleDollarSign, Cpu, GraduationCap, Wifi } from "lucide-react";

const indicadores = [
  { icono: CircleDollarSign, etiqueta: "Salarios", descripcion: "Ingeniería de software" },
  { icono: Building2, etiqueta: "Empresas", descripcion: "Tecnología y startups" },
  { icono: Cpu, etiqueta: "Inteligencia artificial", descripcion: "Ecosistema de IA" },
  { icono: Wifi, etiqueta: "Conectividad", descripcion: "Velocidad de internet" },
  { icono: GraduationCap, etiqueta: "Talento", descripcion: "Universidades técnicas" },
  { icono: BarChart3, etiqueta: "Economía", descripcion: "Inversión y rankings" },
];

export function PanelExplorador() {
  return (
    <aside className="w-full border-b border-border bg-card/30 p-4 md:min-h-[calc(100dvh-4rem)] md:w-80 md:border-r md:border-b-0 md:p-5">
      <div className="rounded-2xl border border-border bg-card/70 p-4 shadow-2xl shadow-black/10">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Explorador</p>
        <h2 className="mt-2 text-lg font-semibold tracking-tight">Indicadores globales</h2>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">
          Analizo los datos que definen cada ecosistema tecnológico.
        </p>

        <ul className="mt-5 grid gap-2 sm:grid-cols-2 md:grid-cols-1">
          {indicadores.map((indicador) => {
            const Icono = indicador.icono;

            return (
              <li key={indicador.etiqueta} className="flex items-center gap-3 rounded-xl px-2 py-2">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icono className="size-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-foreground">
                    {indicador.etiqueta}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {indicador.descripcion}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-4 rounded-2xl border border-dashed border-border bg-secondary/40 p-4">
        <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          Próximo paso
        </p>
        <p className="mt-2 text-sm leading-5 text-foreground">
          Selecciono un país en el mapa para consultar su perfil tecnológico.
        </p>
      </div>
    </aside>
  );
}
