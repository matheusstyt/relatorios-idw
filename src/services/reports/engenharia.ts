import { IFichaTecnicaResponse } from "../../interface/reports/engenharia/fichaTecnica";
import { AxiosResponse } from "axios";
import api from "../../config/api";

const APP_API = "http://170.10.0.206:8080";

export async function FichaTecnicaServices (body: any) {
    return await api.post(`${APP_API}/idw/rest/v2/relatorios/fichatecnica`, body)
        .then( (res : AxiosResponse<IFichaTecnicaResponse>) => {
            return res.data
        })
        .catch( error => {
            return error
        })
}
