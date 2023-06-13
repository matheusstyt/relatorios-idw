/* eslint-disable @typescript-eslint/no-unused-expressions */
import "../../filtros.scss";
import PostosFerramentas from "../../../../components/relatorios/filtros/view/postosFerramentas";
import { Button, Checkbox, Container, Divider, FormControlLabel } from "@mui/material";
import { useState } from "react";
import { DateFormat } from "../../export/datetime";
import Periodo from "../../../../components/relatorios/filtros/view/subFiltros/periodo";
import Contagem from "../../../../components/relatorios/filtros/view/subFiltros/contagem";

const Filtros = (props : any) => {
    // períodos e turnos
    const [periodoChecked, setPeriodoChecked] = useState<boolean>(false);
    const [dataInicio, setDataInicio] = useState<any>(new Date());
    const [dataTermino, setDataTermino] = useState<any>(new Date());

    // postos e ferramentas
    const [postoFerramentaSelecionado, setPostoFerramentaSelecionado] = useState<string>("");
    const [postoFerramentaValorSelecionado, setPostoFerramentaValorSelecionado] = useState<string>("");

    // agrupamentos
    const [exibirProducaoSelecionado, setExibirProducaoSelecionado]= useState<any>("pecas");
    const [exibirPesoSelecionado, setExibirPesoSelecionado]= useState<any>("kilograma");
    
    const verFiltros = () => {

        // carga útil
        const payload = {
            dthrIni : periodoChecked? DateFormat(dataInicio) : null,
            dthrFim : periodoChecked? DateFormat(dataTermino) : null,
            dtEmissao: DateFormat(new Date),
            cdPt : postoFerramentaSelecionado === "Postos" ? postoFerramentaValorSelecionado : null,
            cdGt : postoFerramentaSelecionado === "grupoTrabalho" ? postoFerramentaValorSelecionado : null,
            cdFerramenta : postoFerramentaSelecionado === "ferramentas" ? postoFerramentaValorSelecionado : null,
            cdGrpFerramenta : postoFerramentaSelecionado === "grupoFerramenta" ? postoFerramentaValorSelecionado : null,

            isProducaoEmPeca: exibirProducaoSelecionado==="pecas",
            isProducaoEmPesoBruto: exibirProducaoSelecionado==="pesoBruto",
            isProducaoEmPesoLiquido: exibirProducaoSelecionado==="pesoLiquido",
            isPesoEmKg: exibirProducaoSelecionado!="pecas" && exibirPesoSelecionado=="kilograma",
            isPesoEmTon: exibirProducaoSelecionado!="pecas" &&  exibirPesoSelecionado=="tonelada" 
        };
        
        let grupoTrabalho = "TODOS OS POSTOS";

        if(payload.cdGt!=null)  grupoTrabalho = `GRUPO DE TRABALHO: ${payload.cdGt}`
        if(payload.cdPt!=null)  grupoTrabalho = `POSTO DE TRABALHO: ${payload.cdPt}`
        if(payload.cdFerramenta!=null)  grupoTrabalho = `FERRAMENTA: ${payload.cdFerramenta}`
        if(payload.cdGrpFerramenta!=null)  grupoTrabalho = `GRUPO DE FERRAMENTA: ${payload.cdGrpFerramenta}`

        let producao = "PEÇAS";

        if(exibirProducaoSelecionado==="pecas") producao = "PEÇAS"
        if(exibirProducaoSelecionado==="pesoBruto") producao = `PESO BRUTO - ${exibirPesoSelecionado.toUpperCase()}` 
        if(exibirProducaoSelecionado==="pesoLiquido") producao =  `PESO LÍQUIDO - ${exibirPesoSelecionado.toUpperCase()}` 

        const descricao = {
            grupoTrabalho : grupoTrabalho,
            periodo: `${new Date(dataInicio).toLocaleDateString()} - ${new Date(dataTermino).toLocaleDateString()}`,
            producao: producao,
        }
        console.log(payload);
        console.log(descricao);

        props.getPayload(payload);
        props.getDescricao(descricao);
        props.openPreview(true);
    }
    return (
        <div className="container-filtro">
            <div className="container periodo">
                <h3>Periodo</h3>
                <table>
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
                postoFerramentaSelecionado={(value : any) => setPostoFerramentaSelecionado(value)}
                changed={(value : any) => setPostoFerramentaValorSelecionado(value)}
            />
            <Divider />
            <div className="container contagem">
                <h3>Contagem de Produção</h3>
                <Contagem 
                    producaoValorSelecionado={(value: string) => setExibirProducaoSelecionado(value)}
                    pesoValorSelecionado={(value: string) => setExibirPesoSelecionado(value)}
                />
            </div>
            <Container style={{ display : "flex", justifyContent : "flex-end", gap : "1em"}} >
                <Button variant="contained">LIMPAR</Button>
                <Button disabled={!periodoChecked} onClick={verFiltros} variant="contained">APLICAR FILTRO</Button>
            </Container>
        </div>
    )
}

export default Filtros;