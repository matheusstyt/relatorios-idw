/* eslint-disable @typescript-eslint/no-unused-expressions */
import IntervaloContagem from "../../../../components/reports/filtros/intervaloContagem";
import PostosTrabalho from "../../../../components/reports/filtros/postosTrabalho";
import ProducaoEm from "../../../../components/reports/filtros/producaoEm";
import { Formatar } from "../../../../components/reports/pdf/datetime";
import { Button, Container, Divider } from "@mui/material";
import { useState } from "react";
import "../../filtros.scss";

const Filtros = (props : any) => {
    // períodos e intervalo
    const [dataInicio, setDataInicio] = useState<any>(new Date());
    const [dataTermino, setDataTermino] = useState<any>(new Date());
    const [horaInicio, setHoraInicio] = useState<string>("00:00:00");
    const [horaTermino, setHoraTermino] = useState<string>("01:00:00");

    // postos e ferramentas
    const [postoTrabalhoSelecionado, setPostoTrabalhoSelecionado] = useState<string>("Postos");
    const [postoTrabalhoValorSelecionado, setPostoTrabalhoValorSelecionado] = useState<any>();

    // producao em 
    const [producaoValorSelecionado, setProducaoValorSelecionado] = useState<string>("pecas");
    const [pesoValorSelecionado, setPesoValorSelecionado] = useState<string>("kilograma");
const LimparFiltro = () => {
        setDataInicio(new Date());
        setDataTermino(new Date());
        setHoraInicio("00:00:00");
        setHoraTermino("01:00:00");
        setPostoTrabalhoSelecionado("Postos");
        setPostoTrabalhoValorSelecionado("");
        setProducaoValorSelecionado("pecas");
        setPesoValorSelecionado("kilograma");
        props.closeReport(false);
    }

    const AplicarFiltro = () => {

        // carga útil
        const payload = {

            dthrIni : dataInicio ? `${new Formatar(dataInicio).dataAbreviadaPT()} ${horaInicio}` : null,
            dthrFim : dataInicio ? `${new Formatar(dataTermino).dataAbreviadaPT()} ${horaTermino}` : null,

            cdPt : postoTrabalhoSelecionado === "Postos" ? postoTrabalhoValorSelecionado : null,
            cdGt : postoTrabalhoSelecionado === "grupoTrabalho" ? postoTrabalhoValorSelecionado : null,

            isProducaoEmPeca: producaoValorSelecionado=="pecas",
            isPesoEmKg: producaoValorSelecionado!="pecas" && pesoValorSelecionado=="kilograma",
            isPesoEmTon: producaoValorSelecionado!="pecas" &&  pesoValorSelecionado=="tonelada" 
        };

        let contagem = "";
        if(payload.isProducaoEmPeca) contagem = "PEÇAS"

        let propriedade = "POSTO";
        postoTrabalhoSelecionado === "Postos" ? propriedade = "POSTO" :
        postoTrabalhoSelecionado === "grupoTrabalho" ? propriedade = "GRUPO DE TRABALHO" : propriedade = "POSTO"
 

        let descricao : Object[] = [];
        descricao.push({propery : propriedade, description : postoTrabalhoValorSelecionado ? postoTrabalhoValorSelecionado : "TODOS"})
        descricao.push({propery : "CONTAGEM", description : contagem})
        descricao.push({propery : "INTERVALO", description : 
        `${new Formatar(dataInicio).intervalo()} ${horaInicio} - ${new Formatar(dataTermino).intervalo()} ${horaTermino}`})
        
        console.log(payload);
        props.closeReport(false);
        props.getPayload(payload);
        props.getDescricao(descricao);
        props.openPreview();

    }
    return (
        <div className="container-filtro">
            
            <IntervaloContagem
                dataInicio={dataInicio}
                changeDataInicio={(value : any) => setDataInicio(value)}
                dataTermino={dataTermino}
                changeDataTermino={(value : any) => setDataTermino(value)}
                horaInicio={(value : any) => setHoraInicio(value)}
                horaTermino={(value : any) => setHoraTermino(value)}
            />
            <ProducaoEm
                exibirPesoSelecionado={pesoValorSelecionado}
                changePesoValorSelecionado={(value : string) => setPesoValorSelecionado(value)}
                exibirProducaoSelecionado={producaoValorSelecionado}
                changeProducaoValorSelecionado={(value : string) => setProducaoValorSelecionado(value)}
            />
            <Divider />
            <PostosTrabalho 
                postoTrabalhoSelecionado={postoTrabalhoSelecionado}
                changePostoTrabalhoSelecionado={(value : any) => setPostoTrabalhoSelecionado(value)}
                postoTrabalhoValorSelecionado={postoTrabalhoValorSelecionado}
                changePostoTrabalhoValorSelecionado={(value : any) => setPostoTrabalhoValorSelecionado(value)}
            />

            <Container style={{ display : "flex", justifyContent : "flex-end", gap : "1em"}} >
                <Button onClick={LimparFiltro} variant="contained">LIMPAR</Button>
                <Button onClick={AplicarFiltro} variant="contained">APLICAR FILTRO</Button>
            </Container>
        </div>
    )
}
export default Filtros;