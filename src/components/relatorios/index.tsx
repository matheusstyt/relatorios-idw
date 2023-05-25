import AgrupamentoContagem from "./filtros/agrupamentoContagem";
import DataTurnoPosto from "./filtros/dataTurnoPosto";
import IntervaloContagem from "./filtros/intervaloContagem";
import OpPeriodo from "./filtros/opPeriodo";
import PostosFerramentas from "./filtros/postosFerramentas";
import ProducaoEm from "./filtros/producaoEm";
import "./relatorios.scss";

const Relatorios = () => {
    return (
        <div className="container-relatorio-page">
            <h2>Relatórios</h2>
            <OpPeriodo />
            <PostosFerramentas />
            <AgrupamentoContagem />
            <DataTurnoPosto />
            <ProducaoEm />
            <IntervaloContagem />
        </div>
    )
}
export default Relatorios;