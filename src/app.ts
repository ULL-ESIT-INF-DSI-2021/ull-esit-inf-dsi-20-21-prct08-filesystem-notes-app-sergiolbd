import * as yargs from 'yargs';
import {colors, note} from './types';
import {NoteInstance} from './note';

const noteInstance1 = NoteInstance.getNoteInstance();
const newNote:note = {user: 'Sergio', title: 'Blue', body: 'usa', color: colors.Azul};
noteInstance1.addNotes(newNote);


yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: {
      describe: 'User Note',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Body of note',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' &&
        typeof argv.body === 'string' && typeof argv.color === 'string') {
      let index = 0;
      for (let i = 0; i < 4; i++) {
        if (argv.color === colors[i]) {
          index = i;
        }
      }
      const newNote:note = {user: argv.user, title: argv.title, body: argv.body, color: colors.Azul};
      noteInstance1.addNotes(newNote);
    }
  },
});

yargs.parse();
console.log(noteInstance1.getNotes())
