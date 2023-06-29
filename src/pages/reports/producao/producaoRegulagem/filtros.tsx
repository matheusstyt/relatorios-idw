/* eslint-disable @typescript-eslint/no-unused-expressions */
import "../../filtros.scss";
import { Button, Checkbox, Container, Divider, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
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
    // postos e ferramentas
    const [postoFerramentaSelecionado, setPostoFerramentaSelecionado] = useState<string>("");
    const [postoFerramentaValorSelecionado, setPostoFerramentaValorSelecionado] = useState<string>("");

    // agrupamentos
    const [exibirProducaoSelecionado, setExibirProducaoSelecionado]= useState<any>("pecas");
    const [exibirPesoSelecionado, setExibirPesoSelecionado]= useState<any>("kilograma");
    const [exibirAgrupamentoSelecionado, setExibirAgrupamentoSelecionado]= useState<any>("agrupamentoPosto");

    // regulagem
    const [exibirProducaoOcorrencia, setExibirProducaoOcorrencia]= useState<any>("");
    const [isFiltrarApenasPostosComRegulagem, setIsFiltrarApenasPostosComRegulagem] = useState<boolean>(false);
    const [isExibirParadas, setIsExibirParadas] = useState<boolean>(true);

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
            isPesoEmKg: exibirProducaoSelecionado!="pecas" && exibirPesoSelecionado=="kilograma",
            isPesoEmTon: exibirProducaoSelecionado!="pecas" &&  exibirPesoSelecionado=="tonelada",
            isFiltrarApenasPostosComRegulagem: isFiltrarApenasPostosComRegulagem
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
        descricao.push({propery : "GRUPO DE TRABALHO", description: grupoTrabalho});
        descricao.push({propery : "TURNOS", description: payload.cdTurno === "todos" || payload.cdTurno === null || payload.cdTurno === ""? "TODOS OS TURNOS" : payload.cdTurno});
        descricao.push({propery : "PERÍODO", description: `${new Date(dataInicio).toLocaleDateString()} - ${new Date(dataTermino).toLocaleDateString()}`});
        descricao.push({propery : "PRODUÇÃO EM", description: producao});
        descricao.push({propery : "AGRUPAR POR", description: agrupamento});
        descricao.push({propery : "OP", description: OpNumber});
        
        props.getDescricao(descricao);
        props.openPreview(true);
        props.isProducaoRegulagem(exibirProducaoOcorrencia !== "ocorrenciaRegulagem", payload, isExibirParadas);
       console.log(payload);
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
            <FormControlLabel
                value="FiltrarPostosComParadas"
                label="Filtrar somente postos com paradas de regulagem"
                data-label="Filtrar somente postos com paradas de regulagems"
                name="FiltrarPostosComParadas"
                className="form"
                control={ <Checkbox 
                    value={isFiltrarApenasPostosComRegulagem}
                    onChange={() => {setIsFiltrarApenasPostosComRegulagem(!isFiltrarApenasPostosComRegulagem)}}
                />}
            />
            <Divider />
            <AgrupamentoContagem
                producaoValorSelecionado={(value : any) => setExibirProducaoSelecionado(value)}
                pesoValorSelecionado={(value : any) => setExibirPesoSelecionado(value)}
                agrupamentoValorSelecionado={(value : any) => setExibirAgrupamentoSelecionado(value)}
            />

            <Divider/>
            <div className="container-filtro">
                <h3>Produção e Paradas</h3>
                <RadioGroup 
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={exibirAgrupamentoSelecionado}
                    name="radio-buttons-group"
                    className="radio"
                    onChange={(e) => {
                        setExibirProducaoOcorrencia(e.target.value);
                    }} >
                    <div>
                        <FormControlLabel
                            value="producaoRegulagem"
                            control={<Radio />}
                            label="Relatório de produção em regulagem"
                            name="producaoRegulagem"
                            className="form"
                        />
                        <FormControlLabel
                            value="grupoFerramenta"
                            label="Exibir paradas"
                            disabled={exibirProducaoOcorrencia !== "producaoRegulagem"}
                            data-label="Exibir paradas"
                            name="grupoFerramenta"
                            className="form"
                            control={ <Checkbox 
                                defaultChecked={true}
                                value={isExibirParadas}
                                onChange={() => {
                                    setIsExibirParadas(!isExibirParadas);
                                }}
                            />}
                        />
                    </div>
                    <FormControlLabel
                        value="ocorrenciaRegulagem"
                        control={<Radio />}
                        label="Relatório de ocorrência de parada de regulagem"
                        name="ocorrenciaRegulagem"
                        className="form"
                    />
                </RadioGroup>
            </div>
            <Container style={{ display : "flex", justifyContent : "flex-end", gap : "1em"}} >
                <Button variant="contained">LIMPAR</Button>
                <Button disabled={periodoChecked && exibirProducaoOcorrencia !== "" ? false : true} onClick={verFiltros} variant="contained">APLICAR FILTRO</Button>
            </Container>
        </div>
    )
}
export default Filtros;