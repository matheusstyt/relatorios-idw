import AgrupamentoContagem from "./filtros/agrupamentoContagem";
import AreaResponsavel from "./filtros/areaResponsavel";
import DataTurnoPosto from "./filtros/dataTurnoPosto";
import IntervaloContagem from "./filtros/intervaloContagem";
import OpPeriodo from "./filtros/opPeriodo";
import PeriodoTurno from "./filtros/periodoTurno";
import PostosFerramentas from "./filtros/postosFerramentas";
import ProducaoEm from "./filtros/producaoEm";
import Paradas from "./filtros/paradas";
import PostosTrabalho from "./filtros/postosTrabalho";

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
            <PostosTrabalho />
            <AreaResponsavel />
            <PeriodoTurno />
            <Paradas />
        </div>
    )
}
export default Relatorios;