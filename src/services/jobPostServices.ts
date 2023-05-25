import { IJobPost } from "../models/interface/jobPost/IJobPost";

import { IJobPostResponse } from "../models/interface/jobPost/type";

import api from "../config/api";

const APP_BASE_URL = "";

export default {
    createJobPost: async (payload: IJobPost) => {
        const url = "cadastros/pts/incluir";
        return await api.post<IJobPost>(`${APP_BASE_URL}/${url}`, payload);
    },

    getAllJobPost: async (
        conteudoPesquisa?: string,
        pagina?: number,
        registrosPorPagina?: number,
        ativos?:boolean
    ) => {
        const url = "cadastros/pts";
        return await api.get<IJobPostResponse>(`${APP_BASE_URL}/${url}`, {
            params: {
                conteudoPesquisa,
                pagina,
                registrosPorPagina,
                ativos
            },
        });
    },
    getAllWorkStation: async (
        _conteudoPesquisa?: string,
        _pagina?: number    ) => {
        const url = "bi/filtrosBI/ptsAtivos";
        return await api.get<IJobPostResponse>(`${APP_BASE_URL}/${url}`);
    },
    getAllJobGroupActive: async (
            ) => {
        const url = "bi/filtrosBI/gtsAtivos";
        return await api.get<IJobPostResponse>(`${APP_BASE_URL}/${url}`);
    },

    changeStatusJobPost: async (cdUsrRev: string, cdPt: string) => {
        const url = "cadastros/pts/excluir";
        return await api.put<IJobPost>(`${APP_BASE_URL}/${url}`, {
            cdUsrRev,
            cdPt,
        });
    },

    getOneJobPost: async (cdPt: string) => {
        const url = `cadastros/pts/${cdPt}`;
        return await api.get<IJobPost>(`${APP_BASE_URL}/${url}`);
    },

    updateJobPost: async (payload: IJobPost) => {
        const url = `cadastros/pts/alterar`;
        return await api.put<IJobPost>(`${APP_BASE_URL}/${url}`, payload);
    },
};
