/* eslint-disable @typescript-eslint/no-unused-expressions */
import "../../filtros.scss";
import PostosFerramentas from "../../../../components/relatorios/filtros/view/postosFerramentas";
import Paradas from "../../../../components/relatorios/filtros/view/paradas";
import AreaResponsavel from "../../../../components/relatorios/filtros/view/areaResponsavel";
import { Button, Container, Divider } from "@mui/material";
import { useState } from "react";
import Tipos from "../../../../components/relatorios/filtros/view/subFiltros/tipos";
import OpPeriodo from "../../../../components/relatorios/filtros/view/opPeriodo";
import AgrupamentoContagem from "../../../../components/relatorios/filtros/view/agrupamentoContagem";
import { DateFormat } from "../../export/datetime";

const Filtros = (props : any) => {
    // períodos e turnos
    const [OPChecked, setOPChecked] = useState<boolean>(false);
    const [OpNumber, setOpNumber] = useState<string>("");
    const [periodoChecked, setPeriodoChecked] = useState<boolean>(false);
    const [dataInicio, setDataInicio] = useState<any>(new Date());
    const [dataTermino, setDataTermino] = useState<any>(new Date());
    const [turnoSelecionado, setTurnoSelecionado] = useState<any>(null);

    // tipo
    const [tipoSelecionado, setTipoSelecionado]= useState<any>("padrao")

    // postos e ferramentas
    const [postoFerramentaSelecionado, setPostoFerramentaSelecionado] = useState<string>("");
    const [postoFerramentaValorSelecionado, setPostoFerramentaValorSelecionado] = useState<string>("");

    // agrupamentos
    const [exibirProducaoSelecionado, setExibirProducaoSelecionado]= useState<any>("pecas");
    const [exibirPesoSelecionado, setExibirPesoSelecionado]= useState<any>("kilograma");
    const [exibirAgrupamentoSelecionado, setExibirAgrupamentoSelecionado]= useState<any>("agrupamentoPosto");

    
    const verFiltros = () => {

        // carga útil
        const payload = {
            dthrIni : periodoChecked? DateFormat(dataInicio) : null,
            dthrFim : periodoChecked? DateFormat(dataTermino) : null,
            cdTurno : turnoSelecionado === "todos" ? null : turnoSelecionado,

            cdPt : postoFerramentaSelecionado === "Postos" ? postoFerramentaValorSelecionado : null,
            cdGt : postoFerramentaSelecionado === "grupoTrabalho" ? postoFerramentaValorSelecionado : null,
            cdFerramenta : postoFerramentaSelecionado === "ferramentas" ? postoFerramentaValorSelecionado : null,
            cdGrpFerramenta : postoFerramentaSelecionado === "grupoFerramenta" ? postoFerramentaValorSelecionado : null,

            isAgrupadoPorPt: exibirAgrupamentoSelecionado=="agrupamentoPosto",
            isAgrupadoPorFerramenta: exibirAgrupamentoSelecionado=="agrupamentoFerramenta",
            isAgrupadoPorProduto: exibirAgrupamentoSelecionado=="agrupamentoProduto",
            isProducaoEmPeca: exibirProducaoSelecionado=="pecas",
            isProducaoEmPesoBruto: exibirProducaoSelecionado=="pesoBruto",
            isProducaoEmPesoLiquido: exibirProducaoSelecionado=="pesoLiquido",
            isPesoEmKg: exibirProducaoSelecionado!="pecas" && exibirPesoSelecionado=="kilograma",
            isPesoEmTon: exibirProducaoSelecionado!="pecas" &&  exibirPesoSelecionado=="tonelada" 
        };

        let grupoTrabalho = "TODOS OS POSTOS";

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

        props.getPayload(payload);
        props.getDescricao(descricao);

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
            <Tipos changed={(value : string) => setTipoSelecionado(value)} />
            <Divider />
            <PostosFerramentas
                postoFerramentaSelecionado={(value : any) => setPostoFerramentaSelecionado(value)}
                changed={(value : any) => setPostoFerramentaValorSelecionado(value)}
            />
            <Divider />
            <AgrupamentoContagem
                producaoValorSelecionado={(value : any) => setExibirProducaoSelecionado(value)}
                pesoValorSelecionado={(value : any) => setExibirPesoSelecionado(value)}
                agrupamentoValorSelecionado={(value : any) => setExibirAgrupamentoSelecionado(value)}
            />
            <Container style={{ display : "flex", justifyContent : "flex-end", gap : "1em"}} >
                <Button variant="contained">LIMPAR</Button>
                <Button disabled={!periodoChecked} onClick={verFiltros} variant="contained">APLICAR FILTRO</Button>
            </Container>
        </div>
    )
}

export default Filtros;