import React, { useState } from "react";
import AgrupamentoContagem from "./filtros/view/agrupamentoContagem";
import AreaResponsavel from "./filtros/view/areaResponsavel";
import DataTurnoPosto from "./filtros/view/dataTurnoPosto";
import IntervaloContagem from "./filtros/view/intervaloContagem";
import OpPeriodo from "./filtros/view/opPeriodo";
import PeriodoTurno from "./filtros/view/periodoTurno";
import Postos from "./filtros/view/postos";
import PostosFerramentas from "./filtros/view/postosFerramentas";
import ProducaoEm from "./filtros/view/producaoEm";
import "./relatorios.scss";

import Paradas from "./filtros/view/paradas";
//import  getStops from "./filtros/services";
//const [listaParadas, setListaParadas] = useState<any[]>([]);
const Relatorios = () => {
  
    return (
        <div className="container-relatorio-page">
            <h2>Grupos de Filtros</h2>
            <OpPeriodo />
            <PostosFerramentas />
            <AgrupamentoContagem />
            <DataTurnoPosto />
            <ProducaoEm />
            <IntervaloContagem />
            <Postos />
            <AreaResponsavel />
            <PeriodoTurno />
            <Paradas />
        </div>
    )
}
export default Relatorios;