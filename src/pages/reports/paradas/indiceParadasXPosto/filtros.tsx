/* eslint-disable @typescript-eslint/no-unused-expressions */
import PostosFerramentas from "../../../../components/reports/filtros/postosFerramentas";
import AreaResponsavel from "../../../../components/reports/filtros/areaResponsavel";
import OpPeriodo from "../../../../components/reports/filtros/opPeriodo";
import { Formatar } from "../../../../components/reports/pdf/datetime";
import Paradas from "../../../../components/reports/filtros/paradas";
import { Button, Container, Divider } from "@mui/material";
import { useState } from "react";
import "../../filtros.scss";


const Filtros = (props : any) => {
    // períodos e turnos
    const [OPChecked, setOPChecked] = useState<boolean>(false);
    const [OPNumber, setOPNumber] = useState<string>("");
    const [periodoChecked, setPeriodoChecked] = useState<boolean>(false);
    const [dataInicio, setDataInicio] = useState<Date>(new Date());
    const [dataTermino, setDataTermino] = useState<Date>(new Date());
    const [turnoSelecionado, setTurnoSelecionado] = useState<any>("");

    // postos e ferramentas
    const [postoFerramentaSelecionado, setPostoFerramentaSelecionado] = useState<string>("Postos");
    const [postoFerramentaValorSelecionado, setPostoFerramentaValorSelecionado] = useState<string>("");
    // paradas 
    const [listaParadasSelecionadas, setListaParadasSelecionadas] = useState<any[]>([]);
    const [todasParadasSelecionado, setTodasParadasSelecionado] = useState<boolean>(true);

    // área responsável
    const [listaAreaSelecionadas, setListaAreaSelecionadas] = useState<any[]>([]);
    const [todasAreaSelecioando, setTodasAreaSelecioando] = useState<boolean>(true);

    const LimparFiltro = () => {
        setOPChecked(false);
        setPeriodoChecked(false);
        setOPNumber("");
        setDataInicio(new Date());
        setDataTermino(new Date());
        setTurnoSelecionado("");
        setPostoFerramentaSelecionado("Postos");
        setPostoFerramentaValorSelecionado("");
        setListaParadasSelecionadas([]);
        setTodasParadasSelecionado(true);
        setListaAreaSelecionadas([]);
        setTodasAreaSelecioando(true);
        props.closeReport(false);

    }

    const AplicarFiltro = () => {
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
            op : OPNumber,
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

        let propriedade = "POSTO";
        postoFerramentaSelecionado==="Postos" ? propriedade = "POSTO" :
        postoFerramentaSelecionado==="grupoTrabalho" ? propriedade = "GRUPO DE TRABALHO" :
        postoFerramentaSelecionado==="ferramentas" ? propriedade = "FERRAMENTA" : 
        postoFerramentaSelecionado==="grupoFerramenta" ? propriedade = "GRUPO DE FERRAMENTA" : propriedade = "POSTO"

        let grupoTrabalho = "";

        if(payload.cdGt!=null)  grupoTrabalho = `${payload.cdGt}`
        if(payload.cdPt!=null)  grupoTrabalho = `${payload.cdPt}`
        if(payload.cdFerramenta!=null)  grupoTrabalho = `${payload.cdFerramenta}`
        if(payload.cdGrpFerramenta!=null)  grupoTrabalho = `${payload.cdGrpFerramenta}`
        
        let descricao : Object[] = [];
        descricao.push({propery : propriedade, description : grupoTrabalho})
        descricao.push({propery : "TURNOS", description: payload.cdTurno === "todos" || payload.cdTurno === null || payload.cdTurno === ""? "TODOS OS TURNOS" : payload.cdTurno})
        descricao.push({propery : "PERÍODO", description :`${new Date(dataInicio).toLocaleDateString()} - ${new Date(dataTermino).toLocaleDateString()}`})
        
        console.log(payload);
        props.closeReport(false);
        props.getPayload(payload);
        props.getDescricao(descricao);
        props.openPreview(true);

    }
    return (
        <div className="container-filtro">
            <OpPeriodo 
                periodoChecked={periodoChecked}
                changePeriodoChecked={(value : boolean) => setPeriodoChecked(value)}

                OPChecked={OPChecked}
                changeOPChecked={(value : boolean) => setOPChecked(value)}
                
                OPNumber={OPNumber}
                changeOPNumber={(value : string) => setOPNumber(value)}

                
                dataInicio={dataInicio}
                changeDataInicio={(value : any) => setDataInicio(value)}
                
                dataTermino={dataTermino}
                changeDataTermino={(value : any) => setDataTermino(value)}

                turno={turnoSelecionado}
                changeTurno={(value : any) => setTurnoSelecionado(value)}
            />
            <Divider />
            <PostosFerramentas
                postoFerramentaSelecionado={postoFerramentaSelecionado}
                changePostoFerramentaSelecionado={(value : any) => setPostoFerramentaSelecionado(value)}
                
                value={postoFerramentaValorSelecionado}
                changed={(value : any) => setPostoFerramentaValorSelecionado(value)}
            />
            <Divider />
            <Paradas
                value={listaParadasSelecionadas}
                changed={(value : any) => setListaParadasSelecionadas(value)}
                todasParadasSelecionado={todasParadasSelecionado}
                changeTodasParadasSelecionado={(value : any) => setTodasParadasSelecionado(value)}
            />
            <Divider />
            <AreaResponsavel
                value={listaAreaSelecionadas}
                changed={(value : any) => setListaAreaSelecionadas(value)}
                todasAreaSelecioando={todasAreaSelecioando}
                changeTodasSelecionado={(value : any) => setTodasAreaSelecioando(value)}
            />
            <Container style={{ display : "flex", justifyContent : "flex-end", gap : "1em"}} >
                <Button onClick={LimparFiltro} variant="contained">LIMPAR</Button>
                <Button disabled={!periodoChecked} onClick={AplicarFiltro} variant="contained">APLICAR FILTRO</Button>
                
            </Container>
        </div>
    )
}

export default Filtros;