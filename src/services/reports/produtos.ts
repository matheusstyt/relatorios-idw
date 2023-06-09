import { IAnaliseProducaoResponse } from "../../interface/reports/producao/analiseProducao";
import { IConsolidadosResponse } from "../../interface/reports/producao/consolidados";
import { AxiosResponse } from "axios";
import api from "../../config/api";
import { IAcompanhamentoProducaoResponse } from "../../interface/reports/producao/acompanhamentoProducao";
import { IProducaoRegulagemResponse } from "../../interface/reports/producao/producaoRegulagem";
import { IIndiceRefugoResponse } from "../../interface/reports/producao/indiceRefugos";


const APP_API = "http://170.10.0.206:8080";

export async function ConsolidadosServices (body: any) {
    return await api.post(`${APP_API}/idw/rest/v2/relatorios/consolidados`, body)
        .then( (res : AxiosResponse<IConsolidadosResponse>) => {
            return res.data
        })
        .catch( error => {
            return error
        })
}
export async function AnaliseProducaoServices (body: any) {
    return await api.post(`${APP_API}/idw/rest/v2/relatorios/analiseproducaoeficienciahoraahora`, body)
        .then( (res : AxiosResponse<IAnaliseProducaoResponse>) => {
            return res.data
        })
        .catch( error => {
            return error
        })
}
export async function AcompanhamentoProducaoServices (body: any) {
    return await api.post(`${APP_API}/idw/rest/v2/relatorios/acompanhamentoproducao`, body)
        .then( (res : AxiosResponse<IAcompanhamentoProducaoResponse>) => {
            return res.data
        })
        .catch( error => {
            return error
        })
}
export async function ProducaoRegulagemServices (body: any) {
    return await api.post(`${APP_API}/idw/rest/v2/relatorios/producaoemregulagem`, body)
        .then( (res : AxiosResponse<IProducaoRegulagemResponse>) => {
            return res.data
        })
        .catch( error => {
            return error
        })
}
export async function OcorrenciasParadaServices (body: any) {
    return await api.post(`${APP_API}/idw/rest/v2/relatorios/ocorrenciasparadasregulagem`, body)
        .then( (res : AxiosResponse<IProducaoRegulagemResponse>) => {
            return res.data
        })
        .catch( error => {
            return error
        })
}
export async function IndiceRefugosServices (body: any) {
    return await api.post(`${APP_API}/idw/rest/v2/relatorios/indicerefugos`, body)
        .then( (res : AxiosResponse<IIndiceRefugoResponse>) => {
            return res.data
        })
        .catch( error => {
            return error
        })
}