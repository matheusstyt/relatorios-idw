import { AxiosResponse } from "axios";
import { IIndiceParadaPostoResponse } from "../../../../components/relatorios/filtros/interface/indiceParadasXPosto";
import api from "../../../../config/api";
const APP_API = "http://170.10.0.206:8080";

// export function IndiceParadaPostoServices (body: any) {
//     return api.post(`${APP_API}/idw/rest/v2/relatorios/indiceparadasporposto`, body)
//         .then( (res) => {
//             return res.data
//         })
//         .catch( error => {
//             return error
//         })
// }
export function IndiceParadaPostoServices (body: any) {
       console.log(body)
    return api.post(`${APP_API}/idw/rest/v2/relatorios/indiceparadasporposto`, body)
        .then( (res : AxiosResponse<IIndiceParadaPostoResponse>) => {
            return res.data
        })
        .catch( error => {
            return error
        })
}