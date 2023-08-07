import { Note } from 'src/types/Note';
import { groupBy } from './groupBy';
import { sortArrayOfObj } from './sortArrayOfObj';

const CATEGORIES = ['task', 'quote', 'idea', 'thought'];

export function getCategoriesFromNote(notes: Note[], archive: Note[]) {
	let notesGroup: Record<string, Note[]>;
	let archiveGroup: Record<string, Note[]>;

	try {
		notesGroup = Object.fromEntries(groupBy(notes, 'category'));
	} catch (error) {
		// error showed in groupBy
	}

	try {
		archiveGroup = Object.fromEntries(groupBy(archive, 'category'));
	} catch (error) {
		// error showed in groupBy
	}

	const res = sortArrayOfObj(
		CATEGORIES.map((key) => ({
			category: key,
			active: notesGroup ? notesGroup[key]?.length || 0 : 0,
			archived: archiveGroup ? archiveGroup[key]?.length || 0 : 0,
		})),
		'category',
	);

	return res;
}
