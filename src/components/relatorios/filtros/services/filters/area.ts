import api from "../../../../../config/api";
import { IAreaResponse } from "../../interface/filters/area";
const APP_BASE_URL = "http://170.10.0.206:8080/idw/rest/v2";

export async function getAllArea (
  conteudoPesquisa?: string,
  pagina?: number,
  registrosPorPagina?: number,
  ativos?:boolean
) {
    return api.get<IAreaResponse>(
        `${APP_BASE_URL}/cadastros/areasresponsaveis`,
        {
          params: {
            pagina,
            registrosPorPagina,
            conteudoPesquisa,
            ativos
          },
        }
    )
}