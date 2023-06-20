import { AxiosResponse } from "axios";
import { IIndiceParadaPostoResponse } from "../../filtros/interface/reports/paradas/indiceParadasXPosto";
import api from "../../../../config/api";
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
