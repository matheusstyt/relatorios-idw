import api from "../../config/api";

const APP_BASE_URL = "http://170.10.0.206:8080/idw/rest/v2"; // cadastros/produtos

export async function getAllShiftsSemCalativos () {

    const url = "monitoramento/turnosemcalativos";

    return await api.get(`${APP_BASE_URL}/${url}`);
}