import { IJobPost } from "./JobPost";

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
