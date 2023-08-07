import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { NotesService } from './notes/notes.service';

@Module({
	imports: [NotesModule],
	controllers: [AppController],
	providers: [AppService, NotesService],
})
export class AppModule {}
