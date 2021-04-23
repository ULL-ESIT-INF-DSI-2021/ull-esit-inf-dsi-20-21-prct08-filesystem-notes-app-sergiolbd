import 'mocha';
import {expect} from 'chai';
import {Reduce, AddReduce} from '../src/TemplateMethod';


describe('Test', () => {
  // Primer test
  const inputArray = new AddReduce([1, 2, 3]);
  inputArray.run();

  it('IinputArray.getArray()', () => {
    expect(inputArray.getArray()).to.deep.equal([1, 2, 3]);
  });

  it('AddReduce [1, 2, 3]', () => {
    // console.log(inputArray.getResult());
    expect(inputArray.getResult()).to.be.eq(6);
  });

  const inputArray2 = new AddReduce([2, 2, 4]);
  inputArray2.run();

  it('IinputArray2.getArray()', () => {
    expect(inputArray2.getArray()).to.deep.equal([2, 2, 4]);
  });

  it('AddReduce [2, 2, 4]', () => {
    // console.log(inputArray.getResult());
    expect(inputArray2.getResult()).to.be.eq(8);
  });
});
