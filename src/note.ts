import * as fs from 'fs';
import { write } from 'node:fs';
import {colors, note} from './types';

export class NoteInstance {
  private notes: note[];

  /**
   * Atributo privado estático para almacenar la única instancia
   * que va a tener dicha clase
   */
  private static noteInstance: NoteInstance;

  /**
   * Constructor privado para que no se pueda invocar fuera de la clase
   */
  private constructor() {
    this.notes = [];
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

  getNotes() {
    return NoteInstance.noteInstance.notes;
  }

  addNotes(nota: note) {
    const textNote: string = `Author: ${nota.user}\nBody: ${nota.body}\n`;
    const ruta: string = `./Notes/${nota.title}.txt`;
    if (fs.existsSync(ruta)) {
      console.log('Note title taken!');
    } else {
      console.log('El fichero no existe');
      fs.writeFile(ruta, textNote, (err) => {
        if (err) throw err;
        console.log('New note added!');
      });
    }
  }

  modify(title: string, modify: string, typemodify: string) {
    const ruta: string = `./Notes/${title}.txt`;
    const newruta: string = `./Notes/${modify}.txt`;
    if (fs.existsSync(ruta)) {
      switch (typemodify) {
        case 'rename':
          fs.rename(ruta, newruta, (err) => {
            if (err) throw err;
            console.log(`${title}.txt rename to ${modify}.txt`);
          });
          break;
        case 'append':
          fs.appendFile(ruta, modify, (err) => {
            if (err) throw err;
            console.log(`${modify} was append to ${ruta}`);
          });
          break;
        default: console.log('Unknown type of modify');
          break;
      }
    } else {
      console.log('You cannot modify a non-existent note');
    }
  }

  remove(user: string, title: string) {
    const ruta: string = `./Notes/${title}.txt`;
    if (fs.existsSync(ruta)) {
      fs.rm(ruta, (err) => {
        if (err) throw err;
        console.log(`Remove ${title}`);
      });
    } else {
      console.log('You cannot remove a non-existent note');
    }
  }
}
