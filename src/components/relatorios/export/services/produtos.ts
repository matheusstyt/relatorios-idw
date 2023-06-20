import { AxiosResponse } from "axios";
import api from "../../../../config/api";
import { IConsolidadosResponse } from "../../filtros/interface/reports/producao/consolidados";
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