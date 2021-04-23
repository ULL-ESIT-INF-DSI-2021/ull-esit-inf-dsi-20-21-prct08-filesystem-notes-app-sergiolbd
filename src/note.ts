import * as fs from 'fs';
import {note} from './types';

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
    console.log(this.notes.length)
    this.notes.forEach((note) => {
      if (note.title === nota.title) {
        console.log('Note title taken!');
      } else {
        console.log('New note added!');
      }
    });
    NoteInstance.noteInstance.notes.push(nota);
  }
}
