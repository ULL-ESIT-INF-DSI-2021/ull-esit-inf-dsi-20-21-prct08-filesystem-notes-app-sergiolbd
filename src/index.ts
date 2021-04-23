class Solver {
  constructor(private data: number[], private strategy: Strategy) {
  }
  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }
  logic() {
    this.strategy.execute(this.data);
  }
}


interface Strategy {
  execute(data: number[]): void;
}


class FirstAlgorithm implements Strategy {
  execute(data: number[]) {
    console.log(`First algorithm applied to ${data}`);
  }
}


class SecondAlgorithm implements Strategy {
  execute(data: number[]) {
    console.log(`Second algorithm applied to ${data}`);
  }
}


class ThirdAlgorithm implements Strategy {
  execute(data: number[]) {
    console.log(`Third algorithm applied to ${data}`);
  }
}

const mySolver = new Solver([1, 2, 3], new FirstAlgorithm());
mySolver.logic();
mySolver.setStrategy(new SecondAlgorithm());
mySolver.logic();
mySolver.setStrategy(new ThirdAlgorithm());
mySolver.logic();