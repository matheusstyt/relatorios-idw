interface ILimitsPerPage {
	name: string;
	value: number;
}

export const PER_PAGE_ITEMS: ILimitsPerPage[] = [
	{ name: "8", value: 8 },
	{ name: "15", value: 15 },
	{ name: "25", value: 25 },
	{ name: "50", value: 50 },
];
