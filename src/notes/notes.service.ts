import { Injectable } from '@nestjs/common';
import { NoteDto } from './dto/note.dto';
import { Note } from '../types/Note';
import { getCurrentDateInMs } from 'src/utils/helpers/getCurrentDateInMs';
import { archive } from 'src/data/archive';
import { getCategoriesFromNote } from 'src/utils/helpers/getCategoriesFromNote';
import { notes } from 'src/data/notes';
import { getCheckNote } from './helpers/getCheckNote';

@Injectable()
export class NotesService {
	data: {
		notes: Note[];
		archive: Note[];
	};

	constructor() {
		this.data = { notes, archive };
	}

	async getAll() {
		return this.data;
	}

	async getAllNotes() {
		return this.data.notes;
	}

	async getAllArchive() {
		return this.data.archive;
	}

	async getStatistics() {
		return getCategoriesFromNote(this.data.notes, this.data.archive);
	}

	async moveNoteToArchive(id: string) {
		const note = getCheckNote(this.data.notes, id);
		const newNotes = this.data.notes.filter((note) => note.id !== Number(id));
		this.data = {
			archive: [...this.data.archive, note],
			notes: [...newNotes],
		};
		return newNotes;
	}

	async moveNoteFromArchive(id: string) {
		const note = getCheckNote(this.data.archive, id);
		const newNotes = this.data.archive.filter(
			(note) => note.id !== Number(id),
		);
		this.data = {
			archive: [...newNotes],
			notes: [...this.data.notes, note],
		};
		return newNotes;
	}

	async getNote(id: string) {
		return getCheckNote(this.data.notes, id);
	}

	async addNote(dto: NoteDto) {
		const created = getCurrentDateInMs();
		const newNotes = [...this.data.notes, { ...dto, id: created, created }];
		this.data = { archive: [...this.data.archive], notes: [...newNotes] };
		return {
			archive: [...this.data.archive],
			notes: [...newNotes],
		};
	}

	async editNote(id: string, dto: NoteDto) {
		const note = getCheckNote(this.data.notes, id);
		note.name = dto.name;
		note.category = dto.category;
		note.content = dto.content;
		return note;
	}

	async deleteNoteFromNotes(id: string) {
		getCheckNote(this.data.notes, id);
		const newNotes = this.data.notes.filter((note) => note.id !== Number(id));
		this.data = { archive: [...this.data.archive], notes: [...newNotes] };
		return newNotes;
	}

	async deleteNoteFromArchive(id: string) {
		getCheckNote(this.data.archive, id);
		const newNotes = this.data.archive.filter(
			(note) => note.id !== Number(id),
		);
		this.data = { archive: [...newNotes], notes: [...this.data.notes] };
		return newNotes;
	}
}
