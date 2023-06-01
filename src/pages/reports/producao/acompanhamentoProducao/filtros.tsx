/* eslint-disable @typescript-eslint/no-unused-expressions */
import "../../filtros.scss";

import { Button, Container, Divider } from "@mui/material";
import { useState } from "react";

import IntervaloContagem from "../../../../components/relatorios/filtros/view/intervaloContagem";
import PostosTrabalho from "../../../../components/relatorios/filtros/view/postosTrabalho";
import ProducaoEm from "../../../../components/relatorios/filtros/view/producaoEm";

const Filtros = (props : any) => {
    // períodos e intervalo
    const [dataInicio, setDataInicio] = useState<any>(new Date());
    const [dataTermino, setDataTermino] = useState<any>(new Date());
    const [horaInicio, setHoraInicio] = useState<string>("");
    const [horaTermino, setHoraTermino] = useState<string>("");

    // postos e ferramentas
    const [postoTrabalhoSelecionado, setPostoTrabalhoSelecionado] = useState<string>("");
    const [postoTrabalhoValorSelecionado, setPostoTrabalhoValorSelecionado] = useState<string>("");

    // producao em 
    const [producaoValorSelecionado, setProducaoValorSelecionado] = useState<string>("");
    const [pesoValorSelecionado, setPesoValorSelecionado] = useState<string>("");

    const verFiltros = () => {

        // carga útil
        const payload = {

            dthrIni : dataInicio? dataInicio : null,
            dthFim : dataTermino? dataTermino : null,
            intervaloIni : horaInicio? horaInicio : null,
            intervaloFim : horaTermino? horaTermino : null,

            cdPt : postoTrabalhoSelecionado === "Postos" ? postoTrabalhoValorSelecionado : null,
            cdGt : postoTrabalhoSelecionado === "grupoTrabalho" ? postoTrabalhoValorSelecionado : null,

            isProducaoEmPeca: producaoValorSelecionado=="pecas",
            isProducaoEmPesoBruto: producaoValorSelecionado=="pesoBruto",
            isProducaoEmPesoLiquido: producaoValorSelecionado=="pesoLiquido",
            isPesoEmKg: producaoValorSelecionado!="pecas" && pesoValorSelecionado=="kilograma",
            isPesoEmTon: producaoValorSelecionado!="pecas" &&  pesoValorSelecionado=="tonelada" 
        };

        let grupoTrabalho = "";

        if(payload.cdGt!=null)  grupoTrabalho = `GRUPO DE TRABALHO: ${payload.cdGt}`
        if(payload.cdPt!=null)  grupoTrabalho = `POSTO DE TRABALHO: ${payload.cdPt}`

        const descricao = {
            grupoTrabalho : grupoTrabalho,
            periodo: `${new Date(dataInicio).toLocaleDateString()} - ${new Date(dataTermino).toLocaleDateString()}`,
        }
        console.log(payload);
        console.log(descricao);

        props.getPayload(payload);
        props.getDescricao(descricao);

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