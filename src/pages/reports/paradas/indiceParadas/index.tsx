import AccordionDinamic from "../../../../components/relatorios/accordion";
import { Component, useState } from "react";
import Filtros from "./filtros";
import "../../../pages.scss";
import { Header } from "../../export";
export default function IndiceParadas () {

    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<any>({});

    return (
        <div className="container-page">
            <AccordionDinamic 
                title="Índices de Paradas (R027)"
                component={
                    <Filtros 
                        getPayload={(value: any ) => setCargaUtil(value)}
                        getDescricao={(value: any ) => setDescricao(value)}
                    />
                }
            />

            <div className="export-content">
                <Header 
                    title="Índices de Paradas (R027)" 
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