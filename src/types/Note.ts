import type { Category } from './Category';

export interface Note {
	id: number;
	name: string;
	created: number;
	category: Category;
	content: string;
}
