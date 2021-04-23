import 'mocha';
import {expect} from 'chai';
import {add} from '../src/index';


describe('Test', () => {
  // Primer test


  it('2+3 = 5', () => {
    expect(add(2, 3)).to.be.eq(5);
  });
});
