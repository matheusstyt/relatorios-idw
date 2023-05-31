import AccordionDinamic from "../../../../components/relatorios/accordion";
import { Component, useState } from "react";
import Filtros from "./filtros";
import "../../../pages.scss";
import { Header } from "../../export";
export default function AcompanhamentoProducao () {

    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<any>({});

    return (
        <div className="container-page">
            <AccordionDinamic 
                title="Acompanhamento de Produção (R015)"
                component={
                    <Filtros 
                        getPayload={(value: any ) => setCargaUtil(value)}
                        getDescricao={(value: any ) => setDescricao(value)}
                    />
                }
            />

            <div className="export-content">
                <Header 
                    title="Acompanhamento de Produção (R015)" 
                    components={
                        <>
                            <p>GRUPO DE TRABALHO: {descricao.grupoTrabalho}</p>
                            <p>TURNO: {descricao.turno}</p>
                            <p>PERÍODO: {descricao.periodo}</p>
                        </>
                    }
                />

            </div>
        </div>
    )   
}