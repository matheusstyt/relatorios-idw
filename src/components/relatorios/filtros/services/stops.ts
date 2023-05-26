import api from "../../../../api";
const APP_BASE_URL = "http://170.10.0.206";

export async function getAllStops () {

    const url = "cadastros/paradas";
    
    return await api.get(`${APP_BASE_URL}/${url}`, {
        params: {
            conteudoPesquisa: "",
            pagina: 1,
            registrosPorPagina: 999,
        },
    });
},