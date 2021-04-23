/**
 * Patrón Template Method (Comportamiento)
 * Permite definir un esqueleto algorítmico en una superclase, de modo que
 * aquellas subclases que extiendan el comportamiento de dicho esqueleto puedan
 * sobreescribir algunos pasos del algorítmo sin modificar su estructura base
 * 
 * Ventajas --> Respeta Open-closed
 * Destentajas --> No respeta Liskov Substitution
 */

/**
 * Clase Abstracta donde se define el metodo de plantilla
 */
export abstract class Reduce {
  protected result: number;
  constructor(protected inputArray: number[]) {
  }

  /**
   * Método de plantilla
   */
  public run() {
    this.beforeReduce();
    this.result = this.addReduce(0);

    this.afterReduce();

    // this.beforeReduce();
    // this.result = this.addReduce(0);

    // this.afterReduce();
  }

  /**
   * Obtener el resultado de reduce
   * @returns {string}
   */
  getResult() {
    return this.result;
  }

  /**
   * Obtner el array de entrada
   * @returns {number[]}
   */
  getArray() {
    return this.inputArray;
  }

  /**
   * Método Encargado de aplicar el addReduce
   * @param {number} inicial posición inicial
   * @returns {number}
   */
  protected addReduce(inicial: number): number {
    let result = inicial !== undefined ? inicial : this.inputArray[0];

    for (let i = 0; i < this.inputArray.length; i++) {
      result = this.add(result, this.inputArray[i]);
    }

    return result;
  }

  /**
   * Hock
   */
  abstract afterReduce(): string;
  abstract beforeReduce(): string;


  /**
   * Método abstacto a definir en las clases hijas
   * @param {number} a
   * @param {number} b
   */
  abstract add(a: number, b:number): number;
}

/**
 * Clase hija encargada de hacer una suma de los elementos de un array
 */
export class AddReduce extends Reduce {
  constructor(protected inputArray: number[]) {
    super(inputArray);
  }

  /**
   * Suma de dos elementos
   * @param {number} a 
   * @param {number} b 
   * @returns {number}
   */
  add(a: number, b:number) {
    return a+b;
  }

  /**
   * Método Hock
   * @returns {string}
   */
  afterReduce() {
    return 'Vector reducido por suma';
  }

  /**
   * Método Hock
   * @returns {string}
   */
  beforeReduce() {
    return 'Comenzar AddRecuce';
  }
}

/**
 * Clase hija encargada de hacer una suma de los elementos de un array
 */
export class SubReduce extends Reduce {
  constructor(protected inputArray: number[]) {
    super(inputArray);
  }

  /**
   * Suma de dos elementos
   * @param {number} a 
   * @param {number} b 
   * @returns {number}
   */
  add(a: number, b:number) {
    return a-b;
  }

  /**
   * Método Hock
   * @returns {string}
   */
  afterReduce() {
    return 'Vector reducido por suma';
  }

  /**
   * Método Hock
   * @returns {string}
   */
  beforeReduce() {
    return 'Comenzar AddRecuce';
  }
}


