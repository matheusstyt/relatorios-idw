/* eslint-disable @typescript-eslint/no-unused-expressions */
import PostosFerramentas from "../../../../components/reports/filtros/postosFerramentas";
import { Button, Checkbox, Container, Divider, FormControlLabel } from "@mui/material";
import Contagem from "../../../../components/reports/subFiltros/contagem";
import Periodo from "../../../../components/reports/subFiltros/periodo";
import { Formatar } from "../../../../components/reports/pdf/datetime";
import { useState } from "react";
import "../../filtros.scss";


const Filtros = (props : any) => {
    // períodos e turnos
    const [periodoChecked, setPeriodoChecked] = useState<boolean>(false);
    const [dataInicio, setDataInicio] = useState<any>(new Date());
    const [dataTermino, setDataTermino] = useState<any>(new Date());

    // postos e ferramentas
    const [postoFerramentaSelecionado, setPostoFerramentaSelecionado] = useState<string>("Postos");
    const [postoFerramentaValorSelecionado, setPostoFerramentaValorSelecionado] = useState<string>("");

    // agrupamentos
    const [exibirProducaoSelecionado, setExibirProducaoSelecionado]= useState<any>("pecas");
    const [exibirPesoSelecionado, setExibirPesoSelecionado]= useState<any>("kilograma");
    
    const LimparFiltro = () => {
        setPeriodoChecked(false);
        setDataInicio(new Date());
        setDataTermino(new Date());
        setExibirPesoSelecionado("kilograma");
        setExibirProducaoSelecionado("pecas");
        setPostoFerramentaSelecionado("Postos");
        setPostoFerramentaValorSelecionado("");
        props.closeReport(false);
    }

    const AplicarFiltro = () => {

        // carga útil
        const payload = {
            dthrIni : periodoChecked? new Formatar(dataInicio).dataAbreviada() : null,
            dthrFim : periodoChecked? new Formatar(dataTermino).dataAbreviada() : null,
            dtEmissao: new Formatar(new Date).dataAbreviada(),
            cdPt : postoFerramentaSelecionado === "Postos" ? postoFerramentaValorSelecionado : null,
            cdGt : postoFerramentaSelecionado === "grupoTrabalho" ? postoFerramentaValorSelecionado : null,
            cdFerramenta : postoFerramentaSelecionado === "ferramentas" ? postoFerramentaValorSelecionado : null,
            cdGrpFerramenta : postoFerramentaSelecionado === "grupoFerramenta" ? postoFerramentaValorSelecionado : null,

            isProducaoEmPeca: exibirProducaoSelecionado==="pecas",
            isPesoEmKg: exibirProducaoSelecionado!="pecas" && exibirPesoSelecionado=="kilograma",
            isPesoEmTon: exibirProducaoSelecionado!="pecas" &&  exibirPesoSelecionado=="tonelada" 
        };

        let propriedade = "POSTO";
        postoFerramentaSelecionado==="Postos" ? propriedade = "POSTO" :
        postoFerramentaSelecionado==="grupoTrabalho" ? propriedade = "GRUPO DE TRABALHO" :
        postoFerramentaSelecionado==="ferramentas" ? propriedade = "FERRAMENTA" : 
        postoFerramentaSelecionado==="grupoFerramenta" ? propriedade = "GRUPO DE FERRAMENTA" : propriedade = "POSTO"

        let grupoTrabalho = "TODOS OS POSTOS";

        if(payload.cdGt!=null)  grupoTrabalho = `GRUPO DE TRABALHO: ${payload.cdGt}`
        if(payload.cdPt!=null)  grupoTrabalho = `POSTO DE TRABALHO: ${payload.cdPt}`
        if(payload.cdFerramenta!=null)  grupoTrabalho = `FERRAMENTA: ${payload.cdFerramenta}`
        if(payload.cdGrpFerramenta!=null)  grupoTrabalho = `GRUPO DE FERRAMENTA: ${payload.cdGrpFerramenta}`

        let producao = "PEÇAS";

        if(exibirProducaoSelecionado==="pecas") producao = "PEÇAS"
        if(exibirProducaoSelecionado==="pesoBruto") producao = `PESO BRUTO - ${exibirPesoSelecionado.toUpperCase()}` 
        if(exibirProducaoSelecionado==="pesoLiquido") producao =  `PESO LÍQUIDO - ${exibirPesoSelecionado.toUpperCase()}` 

        let descricao : Object[] = [];
        descricao.push({propery : propriedade, description: grupoTrabalho})
        descricao.push({propery : "PERÍODO", description: `${new Date(dataInicio).toLocaleDateString()} - ${new Date(dataTermino).toLocaleDateString()}`})
        descricao.push({propery : "PRODUÇÃO", description: producao})
        
        console.log(payload);
        props.closeReport(false);
        props.getPayload(payload);
        props.getDescricao(descricao);
        props.openPreview(true);
    }
    return (
        <div className="container-filtro">
            <div className="container periodo">
                <h3>Período</h3>
                <table className="table-filtro">
                    <tbody>
                        <tr>
                            <td>
                                <FormControlLabel 
                                    value="Periodo"
                                    label="Periodo"
                                    name="Periodo"
                                    className="form"
                                    control={
                                        <Checkbox 
                                            value={periodoChecked}
                                            onChange={() => {
                                                setPeriodoChecked(!periodoChecked);
                                            }}
                                        />
                                    }
                                />
                            </td>
                            <td>
                                <Periodo 
                                    changeDataInicio={(value: any) => {
                                        setDataInicio(value);
                                    }}
                                    changeDataTermino={(value: any) => {
                                        setDataTermino(value);
                                    }}
                                    dataInicio={dataInicio}
                                    dataTermino={dataTermino}
                                    disabled={periodoChecked}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
            
            <Divider />
           <PostosFerramentas
                postoFerramentaSelecionado={postoFerramentaSelecionado}
                changePostoFerramentaSelecionado={(value : any) => setPostoFerramentaSelecionado(value)}
                
                value={postoFerramentaValorSelecionado}
                changed={(value : any) => setPostoFerramentaValorSelecionado(value)}
            />
            <Divider />
            <div className="container contagem">
                <h3>Contagem de Produção</h3>
                <Contagem 
                    exibirProducaoSelecionado={exibirProducaoSelecionado}
                    changeProducaoValorSelecionado={(value: string) => setExibirProducaoSelecionado(value)}
                    exibirPesoSelecionado={exibirPesoSelecionado}               
                    changePesoValorSelecionado={(value: string) => setExibirPesoSelecionado(value)}
                />
            </div>
            <Container style={{ display : "flex", justifyContent : "flex-end", gap : "1em"}} >
                <Button onClick={LimparFiltro} variant="contained">LIMPAR</Button>
                <Button disabled={!periodoChecked} onClick={AplicarFiltro} variant="contained">APLICAR FILTRO</Button>
            </Container>
        </div>
    )
}

export default Filtros;