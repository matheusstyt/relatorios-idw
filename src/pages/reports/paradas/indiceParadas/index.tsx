import { Header, IndiceParadasFerramentaBody, IndiceParadasPadraoBody, IndiceParadasProdutoBody, TableDinamic, TotalGeralIndiceParadas } from '../../../../components/reports/pdf';
import converterIndiceParadasFerramenta from '../../../../components/reports/interface/reports/paradas/conversorRequisicao';
import { IRequisicaoTransformada } from '../../../../components/reports/interface/reports/paradas/indiceParadas';
import { IndiceParadaServices } from '../../../../components/reports/services/reports/paradas';
import { getTableDinamicDOM } from '../../../../components/reports/pdf/DOM';
import headers from "../../../../components/reports/pdf/headers.json";
import { Preloader } from '../../../../components/reports/preloader';
import AccordionDinamic from '../../../../components/accordion';
import { useState, useEffect } from 'react';
import { FiFilter } from "react-icons/fi";
import Filtros from "./filtros";
import "../../../pages.scss";

export default function IndiceParadas (props : any) {
    const [exibirPreloader, setExibirPreloader] = useState<boolean>(false);
    const [exibirExportar, setExibirExportar] = useState<boolean>(false);
    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<Object[]>([]);

    const [listaIndiceParada, setListIndiceParada] = useState<IRequisicaoTransformada>();
    useEffect(() => {

    }, cargaUtil)
    async function getIndiceParadas (value : any) {
        setCargaUtil(value);
        await IndiceParadaServices( value)
        .then( async (data) => {
            await setListIndiceParada(
                converterIndiceParadasFerramenta(data, 
                value.isAgrupadoPorFerramenta, 
                value.isAgrupadoPorProduto, 
                value.isAgrupamentoPadrao))            
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
                        getTableDinamicDOM(
                            descricao, // lista de descrição dinâmica
                            `${props.title}`, // título da página
                            "portrait", // orientação da página
                            8, // tamanho da fonte
                            90, // margem de baixo da página
                            isDownload
                        ) }
                    }
                    components={<> {descricao.map((i : any) => <p><strong>{i.propery}:</strong> {i.description}</p> )} </>}
                />
                <div className="table-content">
                    {
                        cargaUtil.isAgrupamentoPadrao ?
                        <TableDinamic headers={headers.paradas.indiceParadasPadrao} body={<IndiceParadasPadraoBody className="indiceparadaxposto" paradas={listaIndiceParada?.indiceParadasDTO} />} />
                        :cargaUtil.isAgrupadoPorProduto ?
                        <TableDinamic headers={headers.paradas.indiceParadasProduto} body={<IndiceParadasProdutoBody className="indiceparadaxposto" paradas={listaIndiceParada?.indiceParadasDTO} />} />
                        :cargaUtil.isAgrupadoPorFerramenta ?
                        <TableDinamic headers={headers.paradas.indiceParadasFerramenta} body={<IndiceParadasFerramentaBody className="indiceparadaxposto" paradas={listaIndiceParada?.indiceParadasDTO} />} />
                        : <></>
                    }
                </div>
                <TotalGeralIndiceParadas dados={listaIndiceParada} />

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
                        getPayload={(value: any ) => getIndiceParadas(value)}
                        getDescricao={(value: any ) => setDescricao(value)}
                        openPreview={(value: boolean) =>  setExibirPreloader(true) }
                    />
                }
            />

            <div className="export-content">
                { !exibirExportar ? <></> : previewPDF() }
            </div>
        </div>
    )   
}