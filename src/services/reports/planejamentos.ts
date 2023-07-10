import { AxiosResponse } from "axios";
import api from "../../config/api";
import { IPlanejadoXRealizadoResponse } from "../../interface/reports/planejamento/planejadoxrealizado";

const APP_API = "http://170.10.0.206:8080";

export async function PlanejadoXRealizadoServices (body: any) {
    return await api.post(`${APP_API}/idw/rest/v2/relatorios/planejadoxrealizado`, body)
        .then( (res : AxiosResponse<IPlanejadoXRealizadoResponse>) => {
            return res.data
        })
        .catch( error => {
            return error
        })
}