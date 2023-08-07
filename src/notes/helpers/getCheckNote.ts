import { ForbiddenException } from '@nestjs/common';
import { Note } from 'src/types/Note';

export function getCheckNote(notes: Note[], id: string) {
	const note = notes.find((note) => note.id === Number(id));
	if (!note) {
		throw new ForbiddenException(`Note with id ${id} does not exist`);
	}
	return note;
}
