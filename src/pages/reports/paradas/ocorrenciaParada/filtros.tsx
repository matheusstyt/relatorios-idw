import AreaResponsavel from "../../../../components/reports/filtros/areaResponsavel";
import PostosFerramentas from "../../../../components/reports/filtros/postosFerramentas";
import OpPeriodo from "../../../../components/reports/filtros/opPeriodo";
import Tipos from "../../../../components/reports/subFiltros/tipos";
import Paradas from "../../../../components/reports/filtros/paradas";
import { Button, Container, Divider } from "@mui/material";
import { useState } from "react";
import "../../filtros.scss";


const Filtros = (props : any) => {
    // períodos e turnos
    const [OPChecked, setOPChecked] = useState<boolean>(false);
    const [OPNumber, setOPNumber] = useState<string>("");
    const [periodoChecked, setPeriodoChecked] = useState<boolean>(false);
    const [dataInicio, setDataInicio] = useState<any>(new Date());
    const [dataTermino, setDataTermino] = useState<any>(new Date());
    const [turnoSelecionado, setTurnoSelecionado] = useState<any>("");

    // tipo
    const [tipoSelecionado, setTipoSelecionado]= useState<any>("padrao")

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

        if(listaParadasSelecionadas.length > 0){
            listaParadaPayload = listaParadasSelecionadas.map(
            (parada : string) => {
                const cdParada = parada.split('-');
                return cdParada[0].trim();
            });
        }
        if(listaAreaSelecionadas.length > 0){
            listaAreaPayload = listaAreaSelecionadas.map(
            (area : string) => {
                const cdArea = area.split('-');
                return cdArea[0].trim();
            });
        }
        // fim da lógica

        // carga útil
        const payload = {
            OPChecked : OPChecked,
            OPNumber : OPNumber,
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

        console.log(payload);
        props.closeReport(false);
        props.getPayload(payload);
      //  props.getDescricao(descricao);
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
            <Tipos changed={(value : string) => setTipoSelecionado(value)} />
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