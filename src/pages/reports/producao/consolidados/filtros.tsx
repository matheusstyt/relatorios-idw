/* eslint-disable @typescript-eslint/no-unused-expressions */
import "../../filtros.scss";
import { Button, Container, Divider } from "@mui/material";
import { useState } from "react";
import { Formatar } from "../../../../components/reports/pdf/datetime";
import OpPeriodo from "../../../../components/reports/filtros/opPeriodo";
import AgrupamentoContagem from "../../../../components/reports/filtros/agrupamentoContagem";
import PostosFerramentas from "../../../../components/reports/filtros/postosFerramentas";


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
            op: OpNumber,
            dthrIni : periodoChecked? new Formatar(dataInicio).dataAbreviada() : null,
            dthrFim : periodoChecked? new Formatar(dataTermino).dataAbreviada() : null,
            cdTurno : turnoSelecionado === "todos" ? null : turnoSelecionado,

            cdPt : postoFerramentaSelecionado === "Postos" ? postoFerramentaValorSelecionado : null,
            cdGt : postoFerramentaSelecionado === "grupoTrabalho" ? postoFerramentaValorSelecionado : null,
            cdFerramenta : postoFerramentaSelecionado === "ferramentas" ? postoFerramentaValorSelecionado : null,
            cdGrpFerramenta : postoFerramentaSelecionado === "grupoFerramenta" ? postoFerramentaValorSelecionado : null,

            isAgrupadoPorPt: exibirAgrupamentoSelecionado==="agrupamentoPosto",
            isAgrupadoPorFerramenta: exibirAgrupamentoSelecionado==="agrupamentoFerramenta",
            isAgrupadoPorProduto: exibirAgrupamentoSelecionado==="agrupamentoProduto",
            isProducaoEmPeca: exibirProducaoSelecionado==="pecas",
            isProducaoEmPesoBruto: exibirProducaoSelecionado==="pesoBruto",
            isProducaoEmPesoLiquido: exibirProducaoSelecionado==="pesoLiquido",
            isPesoEmKg: exibirProducaoSelecionado!="pecas" && exibirPesoSelecionado=="kilograma",
            isPesoEmTon: exibirProducaoSelecionado!="pecas" &&  exibirPesoSelecionado=="tonelada" 
        };
        
        let grupoTrabalho = "TODOS OS POSTOS";

        if(payload.cdGt!==null)  grupoTrabalho = `GRUPO DE TRABALHO: ${payload.cdGt}`
        if(payload.cdPt!==null)  grupoTrabalho = `POSTO DE TRABALHO: ${payload.cdPt}`
        if(payload.cdFerramenta!==null)  grupoTrabalho = `FERRAMENTA: ${payload.cdFerramenta}`
        if(payload.cdGrpFerramenta!==null)  grupoTrabalho = `GRUPO DE FERRAMENTA: ${payload.cdGrpFerramenta}`

        let producao = "PEÇAS";

        if(exibirProducaoSelecionado==="pecas") producao = "PEÇAS"
        if(exibirProducaoSelecionado==="pesoBruto") producao = `PESO BRUTO - ${exibirPesoSelecionado.toUpperCase()}` 
        if(exibirProducaoSelecionado==="pesoLiquido") producao =  `PESO LÍQUIDO - ${exibirPesoSelecionado.toUpperCase()}` 

        let agrupamento = "POSTO";
        exibirAgrupamentoSelecionado==="agrupamentoPosto" ? agrupamento = "POSTO" :
        exibirAgrupamentoSelecionado==="agrupamentoFerramenta" ? agrupamento = "FERRAMENTA" :
        exibirAgrupamentoSelecionado==="agrupamentoProduto" ? agrupamento = "PRODUTO" : agrupamento = ""

        let descricao : Object[] = [];
        descricao.push({propery : "GRUPO DE TRABALHO", description: grupoTrabalho})
        descricao.push({propery : "TURNOS", description: payload.cdTurno === "todos" || payload.cdTurno === null || payload.cdTurno === ""? "TODOS OS TURNOS" : payload.cdTurno})
        descricao.push({propery : "PERÍODO", description: `${new Date(dataInicio).toLocaleDateString()} - ${new Date(dataTermino).toLocaleDateString()}`})
        descricao.push({propery : "PRODUÇÃO EM", description: producao})
        descricao.push({propery : "AGRUPAR POR", description: agrupamento})
        descricao.push({propery : "OP", description: OpNumber})
        
        props.getPayload(payload);
        props.getDescricao(descricao);
        props.openPreview(true);
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