import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { NoteDto } from './note.dto';
import { NotesService } from './notes.service';

@Controller()
export class NotesController {
	constructor(private readonly notesService: NotesService) {}

	@Get('all')
	async getAll() {
		return this.notesService.getAll();
	}

	@Get('notes')
	async getAllNotes() {
		return this.notesService.getAllNotes();
	}

	@Get('archive')
	async getAllArchive() {
		return this.notesService.getAllArchive();
	}

	@Get('statistics')
	async getStatistics() {
		return this.notesService.getStatistics();
	}

	@Delete('notes/to-archive/:id')
	async moveNoteToArchive(@Param('id') id: string) {
		return this.notesService.moveNoteToArchive(id);
	}

	@Delete('archive/from-archive/:id')
	async moveNoteFromArchive(@Param('id') id: string) {
		return this.notesService.moveNoteFromArchive(id);
	}

	@Get('notes/:id')
	async getNote(@Param('id') id: string) {
		return this.notesService.getNote(id);
	}

	@UsePipes(new ValidationPipe())
	@Post('notes')
	async addNote(@Body() dto: NoteDto) {
		return this.notesService.addNote(dto);
	}
	@UsePipes(new ValidationPipe())
	@Patch('notes/:id')
	async editNote(@Param('id') id: string, @Body() dto: NoteDto) {
		return this.notesService.editNote(id, dto);
	}

	@Delete('notes/:id')
	async deleteNoteFromNotes(@Param('id') id: string) {
		return this.notesService.deleteNoteFromNotes(id);
	}

	@Delete('archive/:id')
	async deleteNoteFromArchive(@Param('id') id: string) {
		return this.notesService.deleteNoteFromArchive(id);
	}
}
