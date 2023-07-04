import { IIndiceParadaPostoResponse } from "../../interface/reports/paradas/indiceParadasXPosto";
import { IIndiceParadasResponse } from "../../interface/reports/paradas/indiceParadas";
import api from "../../../../config/api";
import { AxiosResponse } from "axios";

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
        .then( (res : AxiosResponse<IIndiceParadasResponse>) => {
            return res.data
        })
        .catch( error => {
            return error
        })
}
