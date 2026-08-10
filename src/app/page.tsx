"use client";

import { useState } from "react";

import { CabeceraPrincipal, type ModoVista } from "@/components/layout/cabecera-principal";
import { PanelExplorador } from "@/components/layout/panel-explorador";
import { MapaMundial } from "@/components/mapa/mapa-mundial";
import { ComparadorPaises } from "@/components/paises/comparador-paises";
import { ModalInformePais } from "@/components/paises/modal-informe-pais";
import { MatrizPoderAdquisitivo } from "@/components/graficos/matriz-poder-adquisitivo";
import { TablaPaises } from "@/components/paises/tabla-paises";
import type { IndicadorMapa } from "@/types/indicador";
import type { Pais } from "@/types/pais";

export default function Home() {
  const [modoVista, setModoVista] = useState<ModoVista>("mapa");
  const [paisSeleccionado, setPaisSeleccionado] = useState<Pais | null>(null);
  const [paisInformeModal, setPaisInformeModal] = useState<Pais | null>(null);
  const [indicadorActivo, setIndicadorActivo] = useState<IndicadorMapa>("puntuacionTecnologica");
  const [paisesComparados, setPaisesComparados] = useState<Pais[]>([]);

  function alternarPaisComparado(pais: Pais) {
    setPaisesComparados((paisesActuales) => {
      const paisYaComparado = paisesActuales.some(
        (paisActual) => paisActual.codigo === pais.codigo,
      );

      if (paisYaComparado) {
        return paisesActuales.filter((paisActual) => paisActual.codigo !== pais.codigo);
      }

      return paisesActuales.length < 2 ? [...paisesActuales, pais] : paisesActuales;
    });
  }

  function seleccionarPaisGeneral(pais: Pais | null) {
    setPaisSeleccionado(pais);
  }

  function abrirInformePais(pais: Pais) {
    setPaisInformeModal(pais);
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <CabeceraPrincipal
        alSeleccionarPais={(p) => {
          setPaisSeleccionado(p);
          setModoVista("mapa");
        }}
        modoVistaActivo={modoVista}
        alCambiarModoVista={setModoVista}
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
            />
            <ComparadorPaises paises={paisesComparados} alCerrar={() => setPaisesComparados([])} />
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
        limiteComparadorAlcanzado={paisesComparados.length === 2}
        alAlternarComparacion={alternarPaisComparado}
      />
    </div>
  );
}
