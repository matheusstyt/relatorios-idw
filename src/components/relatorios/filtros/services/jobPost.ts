import api from "../../../../api";

import { IJobPostResponse } from "../interface/jobGet";

const APP_BASE_URL = "http://170.10.0.206";

export async function getAllJobPost (
    conteudoPesquisa?: string,
    pagina?: number,
    registrosPorPagina?: number,
    ativos?:boolean
) {
    const url = "cadastros/pts";
    
    return await api.get<IJobPostResponse>(`${APP_BASE_URL}/${url}`, {
        params: {
            conteudoPesquisa,
            pagina,
            registrosPorPagina,
            ativos
        },
    });

}
export async function getAllWorkStation (
    conteudoPesquisa?: string,
    pagina?: number,
    registrosPorPagina?: number
) {
    const url = "bi/filtrosBI/ptsAtivos";
    return await api.get<IJobPostResponse>(`${APP_BASE_URL}/${url}`);
}