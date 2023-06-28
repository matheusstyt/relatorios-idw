import { IAcompanhamentoProducaoResponse } from "../../interface/reports/producao/acompanhamentoProducao";
import { IAnaliseProducaoResponse } from "../../interface/reports/producao/analiseProducao";
import { IConsolidadosResponse } from "../../interface/reports/producao/consolidados";
import api from "../../../../config/api";
import { AxiosResponse } from "axios";

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