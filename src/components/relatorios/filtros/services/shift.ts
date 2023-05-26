import api from "../../../../config/api";
const APP_BASE_URL = "http://170.10.0.206:8080/idw/rest/v2";

export async function getAllShifts (
    conteudoPesquisa?: string,
    pagina?: number,
    registrosPorPagina?: number,
    ativos?:boolean
) {

    const url = "cadastros/turnos";

    return await api.get(`${APP_BASE_URL}/${url}`, {
        params: {
            conteudoPesquisa,
            pagina,
            registrosPorPagina,
            ativos
        },
    });
}
export async function getAllShiftsSemCalativos (
    conteudoPesquisa?: string,
    pagina?: number,
    registrosPorPagina?: number
) {

    const url = "monitoramento/turnosemcalativos";

    return await api.get(`${APP_BASE_URL}/${url}`);
}