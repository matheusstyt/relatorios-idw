import { IAcompanhamentoProducaoResponse, IIntervalo } from "../../../../components/reports/interface/reports/producao/acompanhamentoProducao";
import { AcompanhamentoProducaoBody, Header, TotalGeralAcompanhamentoProducao } from "../../../../components/reports/pdf";
import { AcompanhamentoProducaoServices } from "../../../../components/reports/services/reports/produtos";
import { getTableAcompanhamentoDOM } from "../../../../components/reports/pdf/DOM/acompanhamentoproducao";
import headers from "../../../../components/reports/pdf/headers.json"
import { Preloader } from "../../../../components/reports/preloader";
import AccordionDinamic from "../../../../components/accordion";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import Filtros from "./filtros";
import "../../../pages.scss";

export default function AcompanhamentoProducao (props : any) {
    const [exibirPreloader, setExibirPreloader] = useState<boolean>(false);
    const [exibirExportar, setExibirExportar] = useState<boolean>(false);
    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<Object[]>([]);

    const [analiseProducaoResponse, setAnaliseProducaoResponse] = useState<IAcompanhamentoProducaoResponse>();
    async function getAcompanhamentoProducao (value : any) {
        setCargaUtil(value);
        await AcompanhamentoProducaoServices( value)
        .then((data) => {
            setAnaliseProducaoResponse(data);  
        })
        setExibirPreloader(false);
        setExibirExportar(true);
    }

    const previewPDF = () => {
        return (
            <div className="export-content">
                <Header 
                    title={props.title}
                    getTableDOM={(isDownload: boolean) =>{
                        getTableAcompanhamentoDOM(
                            descricao, // lista de descrição dinâmica
                            `${props.title}`, // título da página
                            "portrait", // orientação da página
                            7, // tamanho da fonte
                            70, // margem de baixo da página
                            isDownload
                        ) }
                    }
                    components={<> {descricao.map((i : any, index: number) => <p key={index}><strong>{i.propery}:</strong> {i.description}</p> )} </>}
                />
                <div className="table-content">
                    
                    <table id="table-acompanhamento" >
                        {analiseProducaoResponse?.intervalos?.map((intervalo: IIntervalo, index: number) => {
                            return <>
                                <thead key={index} id="thead-acompanhamento">
                                    <tr><th align="left" colSpan={9}>PERÍODO: {intervalo.intervalo}</th></tr>
                                    <tr> { headers?.producao?.acompanhamentoProducao?.map( (item : string, index1:number) => <th key={`${index1} - ${item}`}>{item}</th>) } </tr>
                                </thead>
                                <AcompanhamentoProducaoBody postos={intervalo?.postos} totais={intervalo.totais}/>
                            </>
                            }
                        )}
                    </table>
                </div>
                <TotalGeralAcompanhamentoProducao total={analiseProducaoResponse?.totalGeral}/>
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
                        getPayload={(value: any ) => getAcompanhamentoProducao(value)}
                        getDescricao={(value: any ) => setDescricao(value)}
                        openPreview={() =>  setExibirPreloader(true) }
                    />
                }
            />
            { !exibirExportar ? <></> : previewPDF()}
        </div>
    )   
}