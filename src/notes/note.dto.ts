import { IsIn, IsString, MaxLength, MinLength } from 'class-validator';
import { Category } from '../types/Category';

const categories = ['task', 'quote', 'idea', 'thought'];

export class NoteDto {
	@IsString()
	@MinLength(1)
	@MaxLength(64)
	name: string;
	@IsIn(categories)
	category: Category;
	@IsString()
	@MinLength(1)
	content: string;
}
