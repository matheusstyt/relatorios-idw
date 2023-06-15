import api from "../../../../config/api";
import { AxiosResponse } from "axios";
import { IPlanejadoXRealizadoResponse } from "../interface/planejadoxrealizado";

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