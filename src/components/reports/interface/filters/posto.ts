export interface IJobPostResponse {
    items: IJobPost[];
    meta: IMeta;
}

export interface IMeta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface IJobPost {
    cdPt?: string;
    dsPt?: string;
    dsCurta?: string;
    cdGt?: string | number;
    tpPt?: string | number;
    sessaoCLP?: number | string;
    classeABC?: string | number;
    paradaFechaCiclo?: boolean | string;
    cdUsrRev?: string;
    stRegistro?: boolean;
}
