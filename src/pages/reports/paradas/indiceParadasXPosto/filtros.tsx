/* eslint-disable @typescript-eslint/no-unused-expressions */
import PostosFerramentas from "../../../../components/reports/filtros/postosFerramentas";
import AreaResponsavel from "../../../../components/reports/filtros/areaResponsavel";
import OpPeriodo from "../../../../components/reports/filtros/opPeriodo";
import { Formatar } from "../../../../components/reports/pdf/datetime";
import Paradas from "../../../../components/reports/filtros/paradas";
import Tipos from "../../../../components/reports/subFiltros/tipos";
import { Button, Container, Divider } from "@mui/material";
import { useState } from "react";
import "../../filtros.scss";


const Filtros = (props : any) => {
    // períodos e turnos
    const [OPChecked, setOPChecked] = useState<boolean>(false);
    const [OpNumber, setOpNumber] = useState<string>("");
    const [periodoChecked, setPeriodoChecked] = useState<boolean>(false);
    const [dataInicio, setDataInicio] = useState<Date>(new Date());
    const [dataTermino, setDataTermino] = useState<Date>(new Date());
    const [turnoSelecionado, setTurnoSelecionado] = useState<any>("");

    // tipo
    const [tipoSelecionado, setTipoSelecionado]= useState<any>("padrao")

    // postos e ferramentas
    const [postoFerramentaSelecionado, setPostoFerramentaSelecionado] = useState<string>("");
    const [postoFerramentaValorSelecionado, setPostoFerramentaValorSelecionado] = useState<string>("");
    // paradas 
    const [listaParadasSelecionadas, setListaParadasSelecionadas] = useState<any[]>([]);
    const [todasParadasSelecionado, setTodasParadasSelecionado] = useState<boolean>(true);

    // área responsável
    const [listaAreaSelecionadas, setListaAreaSelecionadas] = useState<any[]>([]);
    const [todasAreaSelecioando, setTodasAreaSelecioando] = useState<boolean>(true);

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
           // OPChecked : OPChecked,
            op : OpNumber,
            dthrIni : periodoChecked? new Formatar(dataInicio).dataAbreviada() : null,
            dthrFim : periodoChecked? new Formatar(dataTermino).dataAbreviada() : null,
            cdTurno : turnoSelecionado === "todos" || turnoSelecionado === "" ? null : turnoSelecionado,

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
        
        let descricao : Object[] = [];
        descricao.push({propery : "GRUPO DE TRABALHO", description : grupoTrabalho})
        descricao.push({propery : "TURNOS", description: payload.cdTurno === "todos" || payload.cdTurno === null || payload.cdTurno === ""? "TODOS OS TURNOS" : payload.cdTurno})
        descricao.push({propery : "PERÍODO", description :`${new Date(dataInicio).toLocaleDateString()} - ${new Date(dataTermino).toLocaleDateString()}`})
        
        props.getPayload(payload);
        props.getDescricao(descricao);
        props.openPreview(true);
        console.log(payload)

    }
    return (
        <div className="container-filtro">
            <OpPeriodo 
                periodoChecked={(value : boolean) => setPeriodoChecked(value)}
                OPChecked={(value : boolean) => setOPChecked(value)}
                OpNumber={(value : string) => setOpNumber(value)}
                turno={(value : any) => setTurnoSelecionado(value)}
                dataInicio={(value : any) => setDataInicio(value)}
                dataTermino={(value : any) => setDataTermino(value)}
            />
            {/* <Tipos changed={(value : string) => setTipoSelecionado(value)} /> */}
            <Divider />
            <PostosFerramentas
                postoFerramentaSelecionado={(value : any) => setPostoFerramentaSelecionado(value)}
                changed={(value : any) => setPostoFerramentaValorSelecionado(value)}
            />
            <Divider />
            <Paradas 
                changed={(value : any) => setListaParadasSelecionadas(value)}
                todasSelecionado={(value : any) => setTodasParadasSelecionado(value)}
            />
            <Divider />
            <AreaResponsavel 
                changed={(value : any) => setListaAreaSelecionadas(value)}
                todasSelecionado={(value : any) => setTodasAreaSelecioando(value)}
            />
            <Container style={{ display : "flex", justifyContent : "flex-end", gap : "1em"}} >
                <Button variant="contained">LIMPAR</Button>
                <Button disabled={!periodoChecked} onClick={verFiltros} variant="contained">APLICAR FILTRO</Button>
                
            </Container>
        </div>
    )
}

export default Filtros;