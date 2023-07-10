export interface IItemArea {
	idAreaResponsavel   : number;
    cdAreaResponsavel   : string;
	dsAreaResponsavel   : string;
	stRegistro          : number;
}
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