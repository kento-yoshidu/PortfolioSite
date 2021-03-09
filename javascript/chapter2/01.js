class Number {
  constructor(value) {
    this.value = value
  }
  do = () => {
    return this.value;
  }
}

class Add {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
  do = () => {
    return `${this.left.do()} + ${this.right.do()}`
  }
}

class Multiply {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
  do = () => {
    return `${this.left.do()} * ${this.right.do()}`
  }
}

console.log(new Add(
  new Multiply(new Number(1), new Number(2)),
  new Multiply(new Number(3), new Number(4))
).do());
//=> 1 * 2 + 3 * 4
