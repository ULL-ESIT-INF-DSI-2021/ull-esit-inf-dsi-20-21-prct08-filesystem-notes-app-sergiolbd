import 'mocha';
import {expect} from 'chai';
import * as fs from 'fs';
import {NoteInstance} from '../src/note';
import {note} from '../src/types';


describe('Test', () => {
  // Primer test
  const noteInstance1 = NoteInstance.getNoteInstance();
  const noteInstance2 = NoteInstance.getNoteInstance();

  it('Check that they are the same instance', () => {
    let sameInstance: boolean;
    if (noteInstance1 === noteInstance2) {
      sameInstance = true;
    } else {
      sameInstance = false;
    }
    expect(sameInstance).to.be.eq(true);
  });

  it('Check exist dir ./Note/', () => {
    expect(fs.existsSync('./Notes/')).to.be.eq(true);
  });

  it('noteInstance1.add(note)', () => {
    const test = noteInstance1.addNotes({user: 'sergio', title: 'Prueba', body: 'Check test', color: 'blue'});
    expect(fs.existsSync(`./Notes/sergio/Prueba.json`)).to.be.eq(true);
  });

  it('noteInstance1.modify(oldname, newname)', ()=> {
    noteInstance1.modify('sergio', 'Prueba', 'X');
    expect(fs.existsSync(`./Notes/sergio/X.json`) && !fs.existsSync(`./Notes/sergio/Prueba.json`)).to.be.eq(true);
  });

  it('noteInstance1.list()', () => {
    expect(noteInstance1.list('sergio')).to.deep.eq(['Prueba']);
  });

  it('noteInstance1.read()', () => {
    expect(noteInstance1.read('sergio', 'X')).to.deep.eq(['Prueba', 'Check test']);
  });

  it('noteInstance1.remove()', () => {
    noteInstance1.remove('sergio', 'X');
    expect(fs.existsSync('./Notes/sergio/X.json')).to.be.eq(false);
  });
});
