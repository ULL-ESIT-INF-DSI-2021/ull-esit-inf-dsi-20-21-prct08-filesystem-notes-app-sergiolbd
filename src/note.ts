import * as fs from 'fs';
const chalk = require('chalk');
import {colors, note, JsonNote} from './types';

const error = chalk.bold.red;
const informative = chalk.bold.green;

export class NoteInstance {
  /**
   * Atributo privado estático para almacenar la única instancia
   * que va a tener dicha clase
   */
  private static noteInstance: NoteInstance;

  /**
   * Constructor privado para que no se pueda invocar fuera de la clase
   */
  private constructor() {
  }

  /**
   * Método encargado de comprobar que solo se genera una única
   * instancia de la clase
   * @returns {NoteInstance} Única instancia de la clase
   */
  public static getNoteInstance(): NoteInstance {
    if (!NoteInstance.noteInstance) {
      NoteInstance.noteInstance = new NoteInstance();
    }
    return NoteInstance.noteInstance;
  }

  addNotes(nota: note) {
    const data = JSON.stringify(this.parseJsonNote(nota));
    const ruta: string = `./Notes/${nota.user}/${nota.title}.json`;
    if (fs.existsSync(`./Notes/${nota.user}/`)) {
      if (fs.existsSync(ruta)) {
        console.log(error('Note title taken!'));
      } else {
        fs.writeFileSync(ruta, data);
        console.log(informative(`New note added in ${nota.user}!`));
      }
    } else {
      fs.mkdirSync(`./Notes/${nota.user}/`, {recursive: true});
      fs.writeFileSync(ruta, data);
      console.log(informative('New note added!'));
    }
  }

  modify(user:string, title: string, modify: string, typemodify: string) {
    const ruta: string = `./Notes/${user}/${title}.json`;
    const newruta: string = `./Notes/${user}/${modify}.json`;
    if (fs.existsSync(ruta)) {
      switch (typemodify) {
        case 'rename':
          fs.renameSync(ruta, newruta);
          console.log(informative(`${title}.txt rename to ${modify}.txt`));
          break;
        case 'append':
          fs.appendFileSync(ruta, modify);
          console.log(informative(`${modify} was append to ${ruta}`));
          break;
        default: console.log(error('Unknown type of modify!'));
          break;
      }
    } else {
      console.log(error('You cannot modify a non-existent note!'));
    }
  }

  remove(user: string, title: string) {
    const ruta: string = `./Notes/${user}/${title}.json`;
    if (fs.existsSync(ruta)) {
      fs.rmSync(ruta);
      console.log(informative(`Remove ${title}`));
    } else {
      console.log(error('You cannot remove a non-existent note!'));
    }
  }

  list(user: string) {
    const ruta: string = `./Notes/${user}/`;
    if (fs.existsSync(ruta)) {
      const titles = fs.readdirSync(ruta);
      console.log('Your Notes');
      titles.forEach((note) => {
        const text = fs.readFileSync(ruta + note);
        const titleBody = JSON.parse(text.toString());
        this.colorsprint(titleBody.color, titleBody.title);
      });
    } else {
      console.log('This user has no notes!');
    }
  }

  read(user: string, title: string) {
    const ruta: string = `./Notes/${user}/${title}.json`;
    if (fs.existsSync(ruta)) {
      const text = fs.readFileSync(ruta);
      const titleBody = JSON.parse(text.toString());
      console.log(`${titleBody.title}`);
      this.colorsprint(titleBody.color, titleBody.body);
    } else {
      console.log(error('Note not found!'));
    }
  }

  parseJsonNote(newNote: note): JsonNote {
    const object: JsonNote = {
      user: newNote.user,
      title: newNote.title,
      body: newNote.body,
      color: newNote.color,
    };
    return object;
  }

  colorsprint(color: string, title: string) {
    let colorNote;
    switch (color) {
      case 'Red': colorNote = chalk.bold.red;
        break;
      case 'Yellow': colorNote = chalk.bold.yellow;
        break;
      case 'Green': colorNote = chalk.bold.green;
        break;
      case 'Blue': colorNote = chalk.bold.blue;
        break;
      default: colorNote = chalk.bold.orange;
        break;
    }
    console.log(colorNote(title));
  }
}
