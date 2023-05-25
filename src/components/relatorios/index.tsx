import AgrupamentoContagem from "./filtros/agrupamentoContagem";
import DataTurnoPosto from "./filtros/dataTurnoPosto";
import OpPeriodo from "./filtros/opPeriodo";
import PostosFerramentas from "./filtros/postosFerramentas";
import "./relatorios.scss";

const Relatorios = () => {
    return (
        <div className="container-relatorio-page">
            <h2>Relatórios</h2>
            <OpPeriodo />
            <PostosFerramentas />
            <AgrupamentoContagem />
            <DataTurnoPosto />
        </div>
    )
}
export default Relatorios;