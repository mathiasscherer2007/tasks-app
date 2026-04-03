export interface Todo {
	id: string | FormDataEntryValue;
	description: string | FormDataEntryValue;
	done: boolean;
	createdAt: string;
}
