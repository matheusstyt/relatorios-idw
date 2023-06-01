/* eslint-disable @typescript-eslint/no-unused-expressions */
import DataTurnoPosto from "../../../../components/relatorios/filtros/view/dataTurnoPosto";
import ProducaoEm from "../../../../components/relatorios/filtros/view/producaoEm";
import { Button, Container, Divider } from "@mui/material";
import { useState } from "react";
import "../../filtros.scss";

const Filtros = (props : any) => {

    // períodos e turnos
    const [dataInicio, setDataInicio] = useState<any>(new Date());
    const [dataTermino, setDataTermino] = useState<any>(new Date());
    const [horaInicio, setHoraInicio] = useState<any>(new Date());
    const [horaTermino, setHoraTermino] = useState<any>(new Date());
    const [postoTrabalhoSelecionado, setPostoTrabalhoSelecionado] = useState<any>("");

    // producao em 
    const [producaoValorSelecionado, setProducaoValorSelecionado] = useState<string>("");
    const [pesoValorSelecionado, setPesoValorSelecionado] = useState<string>("");

    const verFiltros = () => {

        // carga útil
        const payload = {

            dthrIni : dataInicio ? dataInicio : null,
            dthFim : dataInicio ? dataTermino : null,
            intervaloIni : horaInicio? horaInicio : null,
            intervaloFim : horaTermino? horaTermino : null,

            cdPt : postoTrabalhoSelecionado ? postoTrabalhoSelecionado : null,
            isProducaoEmPeca: producaoValorSelecionado === "pecas",
            isProducaoEmPesoBruto: producaoValorSelecionado === "pesoBruto",
            isProducaoEmPesoLiquido: producaoValorSelecionado === "pesoLiquido",
            isPesoEmKg: producaoValorSelecionado !== "pecas" && pesoValorSelecionado === "kilograma",
            isPesoEmTon: producaoValorSelecionado !== "pecas" &&  pesoValorSelecionado === "tonelada" 

        };

        let grupoTrabalho = "";

        if(payload.cdPt !== null)  grupoTrabalho = `POSTO DE TRABALHO: ${payload.cdPt}`
        
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
            
            <DataTurnoPosto 
                dataInicio={(value : any) => setDataInicio(value)}
                dataTermino={(value : any) => setDataTermino(value)}
                horaInicio={(value : any) => setHoraInicio(value)}
                horaTermino={(value : any) => setHoraTermino(value)}
                posto={(value : any) => setPostoTrabalhoSelecionado(value)}
            />
            <Divider />
            <ProducaoEm 
                pesoValorSelecionado={(value : string) => setPesoValorSelecionado(value)}
                producaoValorSelecionado={(value : string) => setProducaoValorSelecionado(value)}
            />

            <Container style={{ display : "flex", justifyContent : "flex-end", gap : "1em"}} >
                <Button variant="contained">LIMPAR</Button>
                <Button onClick={verFiltros} variant="contained">APLICAR FILTRO</Button>
            </Container>
        </div>
    )
}

export default Filtros;