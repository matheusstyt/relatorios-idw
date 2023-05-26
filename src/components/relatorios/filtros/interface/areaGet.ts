import { number } from "yup";
import { IItemArea } from "./area";

export interface IAreaResponse  {

	items: IItemArea[];
    meta: IMeta;
}

export interface IMeta{
    totalItems: number;
	itemCount: number;
	itemsPerPage: number;
	totalPages: number; 
	currentPage: number;
}