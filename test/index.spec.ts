import 'mocha';
import {expect} from 'chai';
import {NoteInstance} from '../src/note';
import {colors} from '../src/types';


describe('Test', () => {
  // Primer test
  const noteInstance1 = NoteInstance.getNoteInstance();
  noteInstance1.addNotes({user: 'sergio', title: 'Hello', body: 'World', color: colors.Azul});
  const noteInstance2 = NoteInstance.getNoteInstance();
  noteInstance2.addNotes({user: 'Benítez', title: 'x', body: 'World', color: colors.Amarillo});

  it('Check that they are the same instance', () => {
    let sameInstance: boolean;
    if (noteInstance1 === noteInstance2) {
      sameInstance = true;
    } else {
      sameInstance = false;
    }
    expect(sameInstance).to.be.eq(true);
  });
});
