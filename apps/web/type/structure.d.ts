export type StructureErrors = {
	name?: string;
	description?: string;
	address?: string;
	phone?: string;
	logo?: string;
	unknown?: string;
};

export type StructureState = {
	message: string;
	errors: StructureErrors;
};

export type StructureData = {
	id: number;
	name: string;
	description?: string;
	address?: string;
	phone?: string;
	logo?: string;
};

export type StructureType = {
	id: number;
	name: string;
	address?: string;
	phone?: string;
	logo?: string;
	createDate: string;
	updateDate: string;
	description?: string;
};
