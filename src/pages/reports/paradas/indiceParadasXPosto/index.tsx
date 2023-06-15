import AccordionDinamic from "../../../../components/relatorios/accordion";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import Filtros from "./filtros";
import "../../../pages.scss";
import headers from "../../export/headers.json";
import { Header, IndiceParadaXPostoBody, TableDinamic, TotalGeralIndiceParadaXPosto } from "../../export";
import { IIndiceParadaPostoResponse } from '../../../../components/relatorios/filtros/interface/indiceParadasXPosto';
import { IndiceParadaPostoServices } from "../../export/services/paradas";
import { Audio, Blocks, ProgressBar } from 'react-loader-spinner';
import { Preloader } from "../../../../components/relatorios/preloader";
import relatorioPDF from "../../export/pdmake";
import { Button } from "@mui/material";
export default function IndiceParadasXPosto (props : any) {
    const [exibirPreloader, setExibirPreloader] = useState<boolean>(false);
    const [exibirExportar, setExibirExportar] = useState<boolean>(false);
    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<any>({});
    
    const [listaIndiceParadaPosto, setListIndiceParadaPosto] = useState<IIndiceParadaPostoResponse>();
    async function getIndiceRelatorioPosto (value : any) {
        setCargaUtil(value);
        await IndiceParadaPostoServices( value)
        .then( (data) => {
            setListIndiceParadaPosto(data)
            console.log(data)
            
        })
        setExibirPreloader(false);
        setExibirExportar(true);
    }
    const getTableDinamicDOM = () => {
        const tabela: HTMLElement | null = document.getElementById("table-main");

        // TRECHO QUE BUSCA O CABEÇALHO DA TABELA      
        const details : Object[] = [];
        const headers: any[] = [];
        const thead: HTMLCollectionOf<HTMLTableSectionElement> | any = tabela?.getElementsByTagName("thead");
        for ( let i = 0; i < thead?.length; i++) {
            const primeiroThead: HTMLTableSectionElement | any = thead?.[i];
            let columns : HTMLCollectionOf<HTMLTableCellElement> = primeiroThead.getElementsByTagName("tr");
            Array.from(columns).forEach((coluna: HTMLTableCellElement) => {
                Array.from(coluna.getElementsByTagName("th")).forEach((i : any) => {headers.push(i.textContent)});
            });
        }  
        // TRECHO QUE BUSCA O CORPO DA TABELA
        const tbodies: HTMLCollectionOf<HTMLTableSectionElement> | any = tabela?.getElementsByTagName("tbody");
        for ( let i = 0; i < tbodies?.length; i++) {
            const Tbody: HTMLTableSectionElement | undefined = tbodies?.[i];
            // SE FOR INDICE DE PARADA POR POSTO, IRÁ REALIZAR UMA ABORDAGEM DIFERENTE, PARA TOTAIS.
            const objRow: {details?: Object[], totais?: string[] | null} = {};
            if(Tbody?.className === "t-indiceparadaxposto"){
                // COM UM LOOP, CONSEGUE TODAS AS TAG TD QUE REPRESENTA OS DADOS
                let columns : HTMLCollectionOf<HTMLTableCellElement> | any = Tbody.firstElementChild?.getElementsByTagName("td");
                objRow.details = trDinamic(columns);
                // COM UM LOOP, CONSEGUE TODAS AS TAG P QUE REPRESENTA OS TOTAIS DE UMA LINHA
                let totais: HTMLCollectionOf<HTMLParagraphElement> | any = Tbody.lastElementChild?.firstElementChild?.firstElementChild?.getElementsByTagName("p");
                
                objRow.totais = Array.from(totais).map((p : any) => p?.textContent);
            
            }else{
                const rowsDetails: HTMLCollectionOf<HTMLTableRowElement> | any = tbodies?.[i]?.getElementsByTagName("tr");
                Array.from(rowsDetails).forEach((linha : any ) => {
                    let columns : HTMLCollectionOf<HTMLTableCellElement> = linha.getElementsByTagName("td");
                    objRow.details = trDinamic(columns);
                })
            }
            details.push(objRow);
        }
        // VARRER CÉLULAS DE LINHA
        function trDinamic(cell : HTMLCollectionOf<HTMLTableCellElement> ){
            let row : Object[] = [];

            for ( let j = 0; j < cell.length; j++) {
                let obj: { tdValue?: string | Object | null} = {};
            
                let td = cell[j];

                if(td.children.length > 0) {
                    let p: string[] = []; 
                    Array.from(td.children).map((tdP : any) =>{
                        p.push(tdP.textContent);
                    })
                    obj.tdValue = p;
                }else{
                    obj.tdValue = td.textContent;
                }
                row.push(obj);
            } 
            return row;
        }
        // FIM  
        console.log(headers)
        console.log(details)
        return {headers, details};
    }
    const previewPDF = () => {
        return (
            <div className="export-content">
                <Header 
                    title={props.title}
                    components={
                        <>
                            <p>GRUPO DE TRABALHO: {descricao.grupoTrabalho}</p>
                            <p>TURNO: {descricao.turno}</p>
                            <p>PERÍODO: {descricao.periodo}</p>
                        </>
                    }
                />
                <div className="table-content">
                    <TableDinamic headers={headers.paradas.indiceParadasPosto} body={<IndiceParadaXPostoBody className="indiceparadaxposto" parada={listaIndiceParadaPosto} />} />
                </div>
                <h2>Total Geral</h2>
                <TotalGeralIndiceParadaXPosto dados={listaIndiceParadaPosto} />
                <Button variant="contained" onClick={() => { getTableDinamicDOM() }}>DOM</Button>

                <Button variant="contained" onClick={() => { relatorioPDF(listaIndiceParadaPosto) }}>PDF</Button>
            </div>
        )
    }

    return (
        <div className="container-page">

             { exibirPreloader ? <Preloader /> : <></> }

            <h3 className="title-relatorio">{props.title}</h3>
            <AccordionDinamic
                title="Filtro"
                img={<FiFilter size={25}/>}
                component={
                    <Filtros 
                        getPayload={async (value: any ) => {
                            getIndiceRelatorioPosto(value);
                        }}
                        getDescricao={async (value: any ) => await setDescricao(value) }
                        openPreview={(value: boolean) =>  setExibirPreloader(true) }
                    />
                }
            />
            { !exibirExportar ? <></> : previewPDF() }
        </div>       
    )   
}