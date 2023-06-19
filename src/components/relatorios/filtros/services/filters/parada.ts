import api from "../../../../../config/api";
const APP_BASE_URL = "http://170.10.0.206:8080/idw/rest/v2";

export async function getAllStops () {

    const url = "cadastros/paradas";
    
    return await api.get(`${APP_BASE_URL}/${url}`, {
        params: {
            conteudoPesquisa: "",
            pagina: 1,
            registrosPorPagina: 999,
        },
    });
}

export const  getStops = async (   
    conteudoPesquisa?: string,
    pagina?: number,
    registrosPorPagina?: number,
    ativos?:boolean
    ) =>{
      const url = "cadastros/paradas";
      return await api.get(`${APP_BASE_URL}/${url}`, {
        params: {
          conteudoPesquisa,
          pagina,
          registrosPorPagina,
          ativos
      },
    });
  }