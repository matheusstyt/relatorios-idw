import { AxiosResponse } from "axios";
import { IIndiceParadaPostoResponse } from "../../../../components/relatorios/filtros/interface/indiceParadasXPosto";
import api from "../../../../config/api";
import { IConsolidadosResponse } from "../interface/consolidados";
const APP_API = "http://170.10.0.206:8080";

export async function IndiceParadaPostoServices (body: any) {
    return await api.post(`${APP_API}/idw/rest/v2/relatorios/indiceparadasporposto`, body)
        .then( (res : AxiosResponse<IIndiceParadaPostoResponse>) => {
            return res.data
        })
        .catch( error => {
            return error
        })
}
export async function ConsolidadosServices (body: any) {
    return await api.post(`${APP_API}/idw/rest/v2/relatorios/consolidados`, body)
        .then( (res : AxiosResponse<IConsolidadosResponse>) => {
            return res.data
        })
        .catch( error => {
            return error
        })
}