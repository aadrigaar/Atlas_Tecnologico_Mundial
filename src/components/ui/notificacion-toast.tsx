"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Info, AlertTriangle } from "lucide-react";

export type Notificacion = {
  id: string;
  mensaje: string;
  tipo?: "exito" | "info" | "alerta";
};

type PropiedadesNotificacionToast = {
  notificacion: Notificacion | null;
};

export function NotificacionToast({ notificacion }: PropiedadesNotificacionToast) {
  return (
    <AnimatePresence>
      {notificacion && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-2xl shadow-black/50 backdrop-blur-xl"
        >
          {notificacion.tipo === "exito" && (
            <CheckCircle2 className="size-5 text-primary shrink-0" />
          )}
          {notificacion.tipo === "alerta" && (
            <AlertTriangle className="size-5 text-chart-3 shrink-0" />
          )}
          {(!notificacion.tipo || notificacion.tipo === "info") && (
            <Info className="size-5 text-chart-2 shrink-0" />
          )}
          <span className="text-xs font-semibold text-foreground">{notificacion.mensaje}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
