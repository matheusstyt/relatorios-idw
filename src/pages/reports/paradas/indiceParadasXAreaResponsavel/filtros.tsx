/* eslint-disable @typescript-eslint/no-unused-expressions */
import PeriodoTurno from "../../../../components/relatorios/filtros/view/periodoTurno";
import PostosFerramentas from "../../../../components/relatorios/filtros/view/postosFerramentas";
import Paradas from "../../../../components/relatorios/filtros/view/paradas";
import AreaResponsavel from "../../../../components/relatorios/filtros/view/areaResponsavel";
import { Button } from "@mui/material";
import { useState } from "react";

const Filtros = (props : any) => {
    // períodos e turnos
    const [periodoChecked, setPeriodoChecked] = useState<boolean>(false);
    const [dataInicio, setDataInicio] = useState<any>(new Date());
    const [dataTermino, setDataTermino] = useState<any>(new Date());
    const [turnoSelecionado, setTurnoSelecionado] = useState<any>("");

    // postos e ferramentas
    const [postoFerramentaSelecionado, setPostoFerramentaSelecionado] = useState<string>("");
    const [postoFerramentaValorSelecionado, setPostoFerramentaValorSelecionado] = useState<string>("");
    // paradas 
    const [listaParadasSelecionadas, setListaParadasSelecionadas] = useState<any[]>([]);
    const [todasParadasSelecionado, setTodasParadasSelecionado] = useState<boolean>(false);

    // área responsável
    const [listaAreaSelecionadas, setListaAreaSelecionadas] = useState<any[]>([]);
    const [todasAreaSelecioando, setTodasAreaSelecioando] = useState<boolean>(false);

    const verFiltros = () => {
        // cortar apenas o cdParada e cdArea
        var listaParadaPayload : string[] = [], listaAreaPayload : string[] = [];
        console.log(listaAreaSelecionadas);
        listaParadasSelecionadas.length > 0 ? listaParadaPayload = listaParadasSelecionadas.map(
            (parada : string) => {
                const cdParada = parada.split('-');
                return cdParada[0].trim();
            })
        : null
        listaAreaSelecionadas.length > 0 ? listaAreaPayload = listaAreaSelecionadas.map(
            (area : string) => {
                const cdArea = area.split('-');
                return cdArea[0].trim();
            })
        : null
        // fim da lógica

        // carga útil
        const payload = {
            dthrIni : periodoChecked? dataInicio : null,
            dthFim : periodoChecked? dataTermino : null,
            cdTurno : turnoSelecionado === "todos" ? null : turnoSelecionado,

            cdPt : postoFerramentaSelecionado === "Postos" ? postoFerramentaValorSelecionado : null,
            cdGt : postoFerramentaSelecionado === "grupoTrabalho" ? postoFerramentaValorSelecionado : null,
            cdFerramenta : postoFerramentaSelecionado === "ferramentas" ? postoFerramentaValorSelecionado : null,
            cdGrpFerramenta : postoFerramentaSelecionado === "grupoFerramenta" ? postoFerramentaValorSelecionado : null,

            isTodasAreas: todasAreaSelecioando,
            isTodasParadas: todasParadasSelecionado,
            listaCdParadas: listaParadaPayload,
            listaCdAreas: listaAreaPayload,
        };

        let grupoTrabalho = "";

        if(payload.cdGt!=null)  grupoTrabalho = `GRUPO DE TRABALHO: ${payload.cdGt}`
        if(payload.cdPt!=null)  grupoTrabalho = `POSTO DE TRABALHO: ${payload.cdPt}`
        if(payload.cdFerramenta!=null)  grupoTrabalho = `FERRAMENTA: ${payload.cdFerramenta}`
        if(payload.cdGrpFerramenta!=null)  grupoTrabalho = `GRUPO DE FERRAMENTA: ${payload.cdGrpFerramenta}`
        
        const descricao = {
            grupoTrabalho : grupoTrabalho,
            turno : payload.cdTurno === "todos" || payload.cdTurno === null ? "TODOS OS TURNOS" : payload.cdTurno,
            periodo: `${new Date(dataInicio).toLocaleDateString()} - ${new Date(dataTermino).toLocaleDateString()}`,
        }
        console.log(payload);
        console.log(descricao);
        
        props.getFiltro(payload);
        props.getDescricao(descricao);

    }
    return (
        <div>
            <h4>Filtros:</h4>

            <PeriodoTurno 
                turno={(value : any) => setTurnoSelecionado(value)}
                dataInicio={(value : any) => setDataInicio(value)}
                dataTermino={(value : any) => setDataTermino(value)}
                periodoChecked={(value : boolean) => setPeriodoChecked(value)}
            />
            <PostosFerramentas
                postoFerramentaSelecionado={(value : any) => setPostoFerramentaSelecionado(value)}
                changed={(value : any) => setPostoFerramentaValorSelecionado(value)}
            />
            <Paradas 
                changed={(value : any) => setListaParadasSelecionadas(value)}
                todasSelecionado={(value : any) => setTodasParadasSelecionado(value)}
                />
            <AreaResponsavel 
                changed={(value : any) => setListaAreaSelecionadas(value)}
                todasSelecionado={(value : any) => setTodasAreaSelecioando(value)}
            />
            <Button disabled={!periodoChecked} onClick={verFiltros} variant="contained">APLICAR FILTRO</Button>
        </div>
    )
}

export default Filtros;