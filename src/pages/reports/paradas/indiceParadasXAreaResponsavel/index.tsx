import React from "react";
import PeriodoTurno from "../../../../components/relatorios/filtros/view/periodoTurno";
import PostosFerramentas from "../../../../components/relatorios/filtros/view/postosFerramentas";
import Paradas from "../../../../components/relatorios/filtros/view/paradas";
import AreaResponsavel from "../../../../components/relatorios/filtros/view/areaResponsavel";

export default function IndiceParadasXAreResponsavel () {
    return(
        <div className="container indice-paradas-area-responsavel">
            <PeriodoTurno/>
            <PostosFerramentas/>
            <Paradas/>
            <AreaResponsavel />
        </div>
    )
}