"use client";

import { useState, useEffect } from "react";

import { CabeceraPrincipal, type ModoVista } from "@/components/layout/cabecera-principal";
import { PanelExplorador } from "@/components/layout/panel-explorador";
import { MapaMundial } from "@/components/mapa/mapa-mundial";
import { ComparadorPaises } from "@/components/paises/comparador-paises";
import { ModalInformePais } from "@/components/paises/modal-informe-pais";
import { ModalComparadorAvanzado } from "@/components/paises/modal-comparador-avanzado";
import { ModalEstadisticasGlobales } from "@/components/layout/modal-estadisticas-globales";
import {
  PanelFiltrosAvanzados,
  FILTROS_INICIALES,
  type FiltrosEstado,
} from "@/components/paises/panel-filtros-avanzados";
import { NavegacionInferiorMovil } from "@/components/layout/navegacion-inferior-movil";
import { MatrizPoderAdquisitivo } from "@/components/graficos/matriz-poder-adquisitivo";
import { TablaPaises } from "@/components/paises/tabla-paises";
import { NotificacionToast, type Notificacion } from "@/components/ui/notificacion-toast";
import { paises } from "@/data/paises";
import type { IndicadorMapa } from "@/types/indicador";
import type { Pais } from "@/types/pais";

export default function Home() {
  const [modoVista, setModoVista] = useState<ModoVista>("mapa");
  const [paisSeleccionado, setPaisSeleccionado] = useState<Pais | null>(null);
  const [paisInformeModal, setPaisInformeModal] = useState<Pais | null>(null);
  const [modalComparadorAbierto, setModalComparadorAbierto] = useState(false);
  const [modalEstadisticasAbierto, setModalEstadisticasAbierto] = useState(false);
  const [modalFiltrosAbierto, setModalFiltrosAbierto] = useState(false);
  const [indicadorActivo, setIndicadorActivo] = useState<IndicadorMapa>("puntuacionTecnologica");
  const [paisesComparados, setPaisesComparados] = useState<Pais[]>([]);
  const [filtros, setFiltros] = useState<FiltrosEstado>(FILTROS_INICIALES);
  const [notificacion, setNotificacion] = useState<Notificacion | null>(null);

  // Filtrado de países reactivo
  const paisesFiltrados = paises.filter((p) => {
    if (filtros.continente !== "Todos" && p.continente !== filtros.continente) return false;
    if (p.indicadores.salarioMedioUsd < filtros.salarioMinimoUsd) return false;
    if (p.indicadores.velocidadInternetMbps < filtros.velocidadInternetMinMbps) return false;
    if (p.indicadores.puntuacionTecnologica < filtros.puntuacionMinima) return false;
    if (filtros.soloVisaNomada && !p.ecosistema.visaNomadaDigital) return false;
    return true;
  });

  const hayFiltrosActivos =
    filtros.continente !== "Todos" ||
    filtros.salarioMinimoUsd > 0 ||
    filtros.velocidadInternetMinMbps > 0 ||
    filtros.soloVisaNomada ||
    filtros.puntuacionMinima > 0;

  function mostrarNotificacion(mensaje: string, tipo: "exito" | "info" | "alerta" = "exito") {
    setNotificacion({ id: Date.now().toString(), mensaje, tipo });
    setTimeout(() => {
      setNotificacion(null);
    }, 3000);
  }

  // Atajos de teclado para navegación rápida (1: Mapa, 2: Matriz, 3: Tabla)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.key === "1") setModoVista("mapa");
      if (e.key === "2") setModoVista("matriz");
      if (e.key === "3") setModoVista("tabla");
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function alternarPaisComparado(pais: Pais) {
    setPaisesComparados((paisesActuales) => {
      const paisYaComparado = paisesActuales.some(
        (paisActual) => paisActual.codigo === pais.codigo,
      );

      if (paisYaComparado) {
        mostrarNotificacion(`Quitado ${pais.nombre} de la comparación`, "info");
        return paisesActuales.filter((paisActual) => paisActual.codigo !== pais.codigo);
      }

      if (paisesActuales.length >= 3) {
        mostrarNotificacion("Máximo de 3 países en comparación", "alerta");
        return paisesActuales;
      }

      mostrarNotificacion(`Añadido ${pais.nombre} a la comparación`, "exito");
      return [...paisesActuales, pais];
    });
  }

  function seleccionarPaisGeneral(pais: Pais | null) {
    setPaisSeleccionado(pais);
  }

  function abrirInformePais(pais: Pais) {
    setPaisInformeModal(pais);
  }

  return (
    <div className="min-h-dvh bg-background text-foreground pb-16 md:pb-0">
      <CabeceraPrincipal
        alSeleccionarPais={(p) => {
          setPaisSeleccionado(p);
          setModoVista("mapa");
        }}
        modoVistaActivo={modoVista}
        alCambiarModoVista={setModoVista}
        alAbrirEstadisticasGlobales={() => setModalEstadisticasAbierto(true)}
        alAbrirFiltros={() => setModalFiltrosAbierto(true)}
        hayFiltrosActivos={hayFiltrosActivos}
      />

      {/* Contenido principal según modo de vista */}
      {modoVista === "mapa" && (
        <main className="min-h-[calc(100dvh-4rem)] md:flex">
          <PanelExplorador
            paisSeleccionado={paisSeleccionado}
            indicadorActivo={indicadorActivo}
            alSeleccionarIndicador={setIndicadorActivo}
            paisesComparados={paisesComparados}
            alAlternarPaisComparado={alternarPaisComparado}
            alSeleccionarPais={seleccionarPaisGeneral}
            alAbrirInformePais={abrirInformePais}
          />
          <section className="relative min-h-[32rem] flex-1">
            <MapaMundial
              paisSeleccionado={paisSeleccionado}
              alSeleccionarPais={seleccionarPaisGeneral}
              indicadorActivo={indicadorActivo}
              alAbrirInformePais={abrirInformePais}
              paisesFiltrados={paisesFiltrados}
            />
            <ComparadorPaises
              paises={paisesComparados}
              alCerrar={() => setPaisesComparados([])}
              alAbrirComparadorAvanzado={() => setModalComparadorAbierto(true)}
            />
          </section>
        </main>
      )}

      {modoVista === "matriz" && (
        <main className="h-[calc(100dvh-4rem)]">
          <MatrizPoderAdquisitivo
            alSeleccionarPais={(p) => {
              setPaisSeleccionado(p);
            }}
            alAbrirInformePais={abrirInformePais}
          />
        </main>
      )}

      {modoVista === "tabla" && (
        <main className="h-[calc(100dvh-4rem)]">
          <TablaPaises
            alSeleccionarPais={(p) => {
              setPaisSeleccionado(p);
              setModoVista("mapa");
            }}
            alAbrirInformePais={abrirInformePais}
            paisesComparados={paisesComparados}
            alAlternarComparacion={alternarPaisComparado}
          />
        </main>
      )}

      {/* Modal de Informe Extendido de País */}
      <ModalInformePais
        pais={paisInformeModal}
        alCerrar={() => setPaisInformeModal(null)}
        estaComparado={
          paisInformeModal
            ? paisesComparados.some((p) => p.codigo === paisInformeModal.codigo)
            : false
        }
        limiteComparadorAlcanzado={paisesComparados.length === 3}
        alAlternarComparacion={alternarPaisComparado}
      />

      {/* Modal Comparador Avanzado (2 o 3 Países) */}
      {modalComparadorAbierto && (
        <ModalComparadorAvanzado
          paises={paisesComparados}
          alCerrar={() => setModalComparadorAbierto(false)}
          alAlternarComparacion={alternarPaisComparado}
          alMostrarNotificacion={mostrarNotificacion}
        />
      )}

      {/* Modal de Estadísticas Globales */}
      <ModalEstadisticasGlobales
        abierto={modalEstadisticasAbierto}
        alCerrar={() => setModalEstadisticasAbierto(false)}
        alSeleccionarPais={(p) => {
          setPaisSeleccionado(p);
          setModoVista("mapa");
        }}
      />

      {/* Panel de Filtros Avanzados */}
      <PanelFiltrosAvanzados
        abierto={modalFiltrosAbierto}
        alCerrar={() => setModalFiltrosAbierto(false)}
        filtros={filtros}
        alCambiarFiltros={setFiltros}
        alRestablecerFiltros={() => setFiltros(FILTROS_INICIALES)}
        totalResultados={paisesFiltrados.length}
        totalPaises={paises.length}
      />

      {/* Navegación Inferior Flotante Móvil */}
      <NavegacionInferiorMovil
        modoVistaActivo={modoVista}
        alCambiarModoVista={setModoVista}
        alAbrirInsights={() => setModalEstadisticasAbierto(true)}
        alAbrirFiltros={() => setModalFiltrosAbierto(true)}
        filtrosActivos={hayFiltrosActivos}
      />

      {/* Toast Feedback Notification */}
      <NotificacionToast notificacion={notificacion} />
    </div>
  );
}
