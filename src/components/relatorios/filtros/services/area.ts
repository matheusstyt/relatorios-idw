import api from "../../../../api";
import { IAreaResponse } from "../interface/areaGet";
const APP_BASE_URL = "http://170.10.0.206";

export async function getAllArea () {
    return api.get<IAreaResponse>(
        `${APP_BASE_URL}/cadastros/areasresponsaveis`,
        {
          params: {
            pagina: 1,
            registrosPorPagina: 9999999,
            conteudoPesquisa: "",
            ativos: false
          },
        }
    )
}