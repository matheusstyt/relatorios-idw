import { AxiosResponse } from "axios";
import { IIndiceParadaPostoResponse } from "../../filtros/interface/reports/paradas/indiceParadasXPosto";
import api from "../../../../config/api";
import { IFichaTecnicaResponse } from "../../filtros/interface/reports/engenharia/fichaTecnica";
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
