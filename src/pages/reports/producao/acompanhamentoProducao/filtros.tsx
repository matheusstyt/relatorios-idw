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
    const [horaInicio, setHoraInicio] = useState<string>("");
    const [horaTermino, setHoraTermino] = useState<string>("");

    // postos e ferramentas
    const [postoTrabalhoSelecionado, setPostoTrabalhoSelecionado] = useState<string>("Postos");
    const [postoTrabalhoValorSelecionado, setPostoTrabalhoValorSelecionado] = useState<string>("");

    // producao em 
    const [producaoValorSelecionado, setProducaoValorSelecionado] = useState<string>("pecas");
    const [pesoValorSelecionado, setPesoValorSelecionado] = useState<string>("");

    const verFiltros = () => {

        // carga útil
        const payload = {

            dthrIni : dataInicio ? `${new Formatar(dataInicio).dataAbreviadaPT()} ${horaInicio}` : null,
            dthrFim : dataInicio ? `${new Formatar(dataTermino).dataAbreviadaPT()} ${horaTermino}` : null,

            cdPt : postoTrabalhoSelecionado === "Postos" ? postoTrabalhoValorSelecionado : "",
            cdGt : postoTrabalhoSelecionado === "grupoTrabalho" ? postoTrabalhoValorSelecionado : "",

            isProducaoEmPeca: producaoValorSelecionado=="pecas",
            isProducaoEmPesoBruto: producaoValorSelecionado=="pesoBruto",
            isProducaoEmPesoLiquido: producaoValorSelecionado=="pesoLiquido",
            isPesoEmKg: producaoValorSelecionado!="pecas" && pesoValorSelecionado=="kilograma",
            isPesoEmTon: producaoValorSelecionado!="pecas" &&  pesoValorSelecionado=="tonelada" 
        };

        let contagem = "";
        if(payload.isProducaoEmPeca) contagem = "PEÇAS"
        if(payload.isProducaoEmPesoBruto) contagem = "PESO BRUTO"
        if(payload.isProducaoEmPesoLiquido) contagem = "PESO LÍQUIDO"

        let descricao : Object[] = [];
        descricao.push({propery : "GRUPO DE TRABALHO", description : postoTrabalhoSelecionado})
        descricao.push({propery : "CONTAGEM", description : contagem})
        descricao.push({propery : "INTERVALO", description : 
        `${new Formatar(dataInicio).intervalo()} ${horaInicio} - ${new Formatar(dataTermino).intervalo()} ${horaTermino}`})
        
        console.log(payload);

        props.getPayload(payload);
        props.getDescricao(descricao);
        props.openPreview(true);

    }
    return (
        <div className="container-filtro">
            
            <IntervaloContagem
                dataInicio={(value : any) => setDataInicio(value)}
                dataTermino={(value : any) => setDataTermino(value)}
                horaInicio={(value : any) => setHoraInicio(value)}
                horaTermino={(value : any) => setHoraTermino(value)}
            />
            <ProducaoEm 
                pesoValorSelecionado={(value : string) => setPesoValorSelecionado(value)}
                producaoValorSelecionado={(value : string) => setProducaoValorSelecionado(value)}
            />
            <Divider />
            <PostosTrabalho 
                postoTrabalhoSelecionado={(value : any) => setPostoTrabalhoSelecionado(value)}
                postoTrabalhoValorSelecionado={(value : any) => setPostoTrabalhoValorSelecionado(value)}
            />

            <Container style={{ display : "flex", justifyContent : "flex-end", gap : "1em"}} >
                <Button variant="contained">LIMPAR</Button>
                <Button onClick={verFiltros} variant="contained">APLICAR FILTRO</Button>
            </Container>
        </div>
    )
}
export default Filtros;