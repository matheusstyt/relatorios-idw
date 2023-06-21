import { AxiosResponse } from "axios";
import { IIndiceParadaPostoResponse } from "../../filtros/interface/reports/paradas/indiceParadasXPosto";
import api from "../../../../config/api";
import { IIndiceParadaResponse } from "../../filtros/interface/reports/paradas/indiceParadas";
const APP_API = "http://170.10.0.206:8080";

export async function IndiceParadaXPostoServices (body: any) {
    return await api.post(`${APP_API}/idw/rest/v2/relatorios/indiceparadasporposto`, body)
        .then( (res : AxiosResponse<IIndiceParadaPostoResponse>) => {
            return res.data
        })
        .catch( error => {
            return error
        })
}
export async function IndiceParadaServices (body: any) {
    return await api.post(`${APP_API}/idw/rest/v2/relatorios/indiceparadas`, body)
        .then( (res : AxiosResponse<IIndiceParadaResponse>) => {
            return res.data
        })
        .catch( error => {
            return error
        })
}
