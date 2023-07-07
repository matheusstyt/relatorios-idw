import { Button, Container, Divider } from "@mui/material";
import { useState } from "react";
import "../../filtros.scss";
import { Formatar } from "../../../../components/reports/pdf/datetime";
import DataTurnoPosto from "../../../../components/reports/filtros/dataTurnoPosto";
import ProducaoEm from "../../../../components/reports/filtros/producaoEm";

const Filtros = (props : any) => {

    // períodos e turnos
    const [dataInicio, setDataInicio] = useState<any>(new Date());
    const [dataTermino, setDataTermino] = useState<any>(new Date());
    const [horaInicio, setHoraInicio] = useState<any>("00:00:00");
    const [horaTermino, setHoraTermino] = useState<any>("01:00:00");
    const [postoTrabalhoSelecionado, setPostoTrabalhoSelecionado] = useState<string>("");

    // producao em 
    const [producaoValorSelecionado, setProducaoValorSelecionado] = useState<string>("pecas");
    const [pesoValorSelecionado, setPesoValorSelecionado] = useState<string>("kilograma");
    
    const LimparFiltro = () => {
        setDataInicio(new Date());
        setDataTermino(new Date());
        setHoraInicio("00:00:00");
        setDataTermino("01:00:00");
        setPostoTrabalhoSelecionado("");
        setProducaoValorSelecionado("pecas");
        setPesoValorSelecionado("kilograma");
        props.closeReport(false);
    }

    const AplicarFiltro = () => {
        // carga útil
        const payload = {

            dthrIni : dataInicio ? `${new Formatar(dataInicio).dataAbreviadaPT()} ${horaInicio}` : null,
            dthFim : dataInicio ? `${new Formatar(dataTermino).dataAbreviadaPT()} ${horaTermino}` : null,

            cdPt : postoTrabalhoSelecionado ? postoTrabalhoSelecionado : "",
            isProducaoEmPeca: producaoValorSelecionado === "pecas",
            isProducaoEmPesoBruto: producaoValorSelecionado === "pesoBruto",
            isProducaoEmPesoLiquido: producaoValorSelecionado === "pesoLiquido",
            isPesoEmKg: producaoValorSelecionado !== "pecas" && pesoValorSelecionado === "kilograma",
            isPesoEmTon: producaoValorSelecionado !== "pecas" &&  pesoValorSelecionado === "tonelada" 

        };

        let producao = "PEÇAS";

        if(producaoValorSelecionado==="pecas") producao = "PEÇAS"
        if(producaoValorSelecionado==="pesoBruto") producao = `PESO BRUTO - ${pesoValorSelecionado.toUpperCase()}` 
        if(producaoValorSelecionado==="pesoLiquido") producao =  `PESO LÍQUIDO - ${pesoValorSelecionado.toUpperCase()}` 

        let descricao : Object[] = [];
        descricao.push({propery : "POSTO", description : postoTrabalhoSelecionado})
        descricao.push({propery : "PRODUÇÃO EM", description : producao})
        descricao.push({propery : "INTERVALO", description : 
        `${new Formatar(dataInicio).intervalo()} ${horaInicio} - ${new Formatar(dataTermino).intervalo()} ${horaTermino}`})
        
        console.log(payload);
        
        props.getPayload(payload);
        props.getDescricao(descricao);
        props.openPreview(true);
    }
    return (
        <div className="container-filtro">
            
            <DataTurnoPosto 
                dataInicio={dataInicio}
                changeDataInicio={(value : any) => setDataInicio(value)}
                
                dataTermino={dataTermino}
                changeDataTermino={(value : any) => setDataTermino(value)}
                
                horaInicio={(value : any) => setHoraInicio(value)}
                horaTermino={(value : any) => setHoraTermino(value)}

                postoValor={postoTrabalhoSelecionado}
                changePostoValor={(value : any) => setPostoTrabalhoSelecionado(value)}
            />
            <Divider />
            <ProducaoEm 
                pesoValorSelecionado={pesoValorSelecionado}
                changePesoValorSelecionado={(value : string) => setPesoValorSelecionado(value)}
                producaoValorSelecionado={producaoValorSelecionado}
                changeProducaoValorSelecionado={(value : string) => setProducaoValorSelecionado(value)}
            />

            <Container style={{ display : "flex", justifyContent : "flex-end", gap : "1em"}} >
                <Button onClick={LimparFiltro} variant="contained">LIMPAR</Button>
                <Button disabled={postoTrabalhoSelecionado === ""} onClick={AplicarFiltro} variant="contained">APLICAR FILTRO</Button>
            </Container>
        </div>
    )
}

export default Filtros;