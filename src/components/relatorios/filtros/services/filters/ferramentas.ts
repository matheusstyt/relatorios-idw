import api from "../../../../../config/api";

const APP_BASE_URL = "http://170.10.0.206:8080/idw/rest/v2";

export async function getAllToolsGroup (
    conteudoPesquisa: string,
    pagina: number,
    registrosPorPagina: number,
    ativos?:boolean
) {
    const url = "cadastros/gruposferramentas";
    return await api.get(`${APP_BASE_URL}/${url}`, {
        params: {
            conteudoPesquisa,
            pagina,
            registrosPorPagina,
            ativos
        },
    });
}

export async function getAllToolsGroupActive (
    conteudoPesquisa: string,
    pagina: number,
    registrosPorPagina: number
) {
    const url = "bi/filtrosBI/grupoFerramentasAtivas";
    return await api.get(`${APP_BASE_URL}/${url}`);
}

export async function getAllToolsActive (
    conteudoPesquisa: string,
    pagina: number,
    registrosPorPagina: number
) {
    const url = "bi/filtrosBI/ferramentasAtivas";
    return await api.get(`${APP_BASE_URL}/${url}`);
}