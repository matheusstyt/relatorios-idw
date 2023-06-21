import { AxiosResponse } from "axios";
import api from "../../../../config/api";
import { IConsolidadosResponse } from "../../filtros/interface/reports/producao/consolidados";
import { IAnaliseProducaoResponse } from "../../filtros/interface/reports/producao/analiseProducao";
import { IAcompanhamentoPrroducaoResponse } from "../../filtros/interface/reports/producao/acompanhamentoProducao";
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
        .then( (res : AxiosResponse<IAcompanhamentoPrroducaoResponse>) => {
            return res.data
        })
        .catch( error => {
            return error
        })
}