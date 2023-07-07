/* eslint-disable @typescript-eslint/no-unused-expressions */
import "../../filtros.scss";
import { Button, Container, Divider } from "@mui/material";
import { useState } from "react";
import { Formatar } from "../../../../components/reports/pdf/datetime";
import OpPeriodo from "../../../../components/reports/filtros/opPeriodo";
import AgrupamentoContagem from "../../../../components/reports/filtros/agrupamentoContagem";
import PostosFerramentas from "../../../../components/reports/filtros/postosFerramentas";
import AgrupamentoContagemConsolidados from "../../../../components/reports/filtros/agrupamentoContagemConsolidados";


const Filtros = (props : any) => {
    // períodos e turnos
    const [OPChecked, setOPChecked] = useState<boolean>(false);
    const [OPNumber, setOPNumber] = useState<string>("");
    const [periodoChecked, setPeriodoChecked] = useState<boolean>(false);
    const [dataInicio, setDataInicio] = useState<any>(new Date());
    const [dataTermino, setDataTermino] = useState<any>(new Date());
    const [turnoSelecionado, setTurnoSelecionado] = useState<any>(null);

    // postos e ferramentas
    const [postoFerramentaSelecionado, setPostoFerramentaSelecionado] = useState<string>("Postos");
    const [postoFerramentaValorSelecionado, setPostoFerramentaValorSelecionado] = useState<any>(null);

    // agrupamentos
    const [exibirProducaoSelecionado, setExibirProducaoSelecionado]= useState<any>("pecas");
    const [exibirPesoSelecionado, setExibirPesoSelecionado]= useState<any>("kilograma");
    const [exibirAgrupamentoSelecionado, setExibirAgrupamentoSelecionado]= useState<any>("agrupamentoPosto");

    const LimparFiltro = () => {
        setOPChecked(false);
        setPeriodoChecked(false);
        setOPNumber("");
        setDataInicio(new Date());
        setDataTermino(new Date());
        setTurnoSelecionado("");
        setPostoFerramentaSelecionado("Postos");
        setPostoFerramentaValorSelecionado("");
        setExibirProducaoSelecionado("pecas");
        setExibirPesoSelecionado("kilograma");
        setExibirAgrupamentoSelecionado("agrupamentoPosto")
        props.closeReport(false);
    }

    const AplicarFiltro = () => {

        // carga útil
        const payload = {
            op: OPNumber,
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
        let propriedade = "POSTO";
        postoFerramentaSelecionado==="Postos" ? propriedade = "POSTO" :
        postoFerramentaSelecionado==="grupoTrabalho" ? propriedade = "GRUPO DE TRABALHO" :
        postoFerramentaSelecionado==="ferramentas" ? propriedade = "FERRAMENTA" : 
        postoFerramentaSelecionado==="grupoFerramenta" ? propriedade = "GRUPO DE FERRAMENTA" : propriedade = "POSTO"

        let grupoTrabalho = "TODOS";

        if(payload.cdGt!==null)  grupoTrabalho = `${payload.cdGt}`
        if(payload.cdPt!==null)  grupoTrabalho = `${payload.cdPt}`
        if(payload.cdFerramenta!==null)  grupoTrabalho = `${payload.cdFerramenta}`
        if(payload.cdGrpFerramenta!==null)  grupoTrabalho = `${payload.cdGrpFerramenta}`

        let producao = "PEÇAS";

        if(exibirProducaoSelecionado==="pecas") producao = "PEÇAS"
        if(exibirProducaoSelecionado==="pesoBruto") producao = `PESO BRUTO - ${exibirPesoSelecionado.toUpperCase()}` 
        if(exibirProducaoSelecionado==="pesoLiquido") producao =  `PESO LÍQUIDO - ${exibirPesoSelecionado.toUpperCase()}` 

        let agrupamento = "POSTO";
        exibirAgrupamentoSelecionado==="agrupamentoPosto" ? agrupamento = "POSTO" :
        exibirAgrupamentoSelecionado==="agrupamentoFerramenta" ? agrupamento = "FERRAMENTA" :
        exibirAgrupamentoSelecionado==="agrupamentoProduto" ? agrupamento = "PRODUTO" : agrupamento = ""

        let descricao : Object[] = [];
        descricao.push({propery : propriedade, description: grupoTrabalho})
        descricao.push({propery : "TURNOS", description: payload.cdTurno === "todos" || payload.cdTurno === null || payload.cdTurno === ""? "TODOS OS TURNOS" : payload.cdTurno})
        descricao.push({propery : "PERÍODO", description: `${new Date(dataInicio).toLocaleDateString()} - ${new Date(dataTermino).toLocaleDateString()}`})
        descricao.push({propery : "PRODUÇÃO EM", description: producao})
        descricao.push({propery : "AGRUPAR POR", description: agrupamento})
        descricao.push({propery : "OP", description: OPNumber})
        
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
            <AgrupamentoContagemConsolidados
                exibirProducaoSelecionado={exibirProducaoSelecionado}
                changeProducaoValorSelecionado={(value: string) => setExibirProducaoSelecionado(value)}
                
                exibirPesoSelecionado={exibirPesoSelecionado}               
                changePesoValorSelecionado={(value: string) => setExibirPesoSelecionado(value)}

                exibirAgrupamentoSelecionado={exibirAgrupamentoSelecionado}
                changeAgrupamentoValorSelecionado={(value : any) => setExibirAgrupamentoSelecionado(value)}

            />
            <Container style={{ display : "flex", justifyContent : "flex-end", gap : "1em"}} >
                <Button onClick={LimparFiltro} variant="contained">LIMPAR</Button>
                <Button disabled={!periodoChecked} onClick={AplicarFiltro} variant="contained">APLICAR FILTRO</Button>
            </Container>
        </div>
    )
}

export default Filtros;