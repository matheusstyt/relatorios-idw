import api from "../../config/api";

import { IProdutosResponse } from "../../interface/filters/produtos";

const APP_BASE_URL = "http://170.10.0.206:8080/idw/rest/v2";

export async function getAllProducts () {

    const url = "cadastros/produtos";
    
    return await api.get<IProdutosResponse>(`${APP_BASE_URL}/${url}`);
}