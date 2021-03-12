// BooleanクラスとLessThanクラスの実装

class Number {
  constructor(value) {
    this.value = value
  }
  getExpression = () => {
    return this.value;
  }
  isReducible = () => {
    return false
  }
}

class Add {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
  getExpression = () => {
    return `${this.left.getExpression()} + ${this.right.getExpression()}`
  }
  isReducible = () => {
    return true
  }
  reduce = () => {
    if(this.left.isReducible()) {
      return new Add(this.left.reduce(), this.right);
    } else if(this.right.isReducible()) {
      return new Add(this.left, this.right.reduce());
    } else {
      return new Number(this.left.getExpression() + this.right.getExpression())
    }
  }
}

class Multiply {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
  getExpression = () => {
    return `${this.left.getExpression()} * ${this.right.getExpression()}`
  }
  isReducible = () => {
    return true
  }
  reduce = () => {
    if(this.left.isReducible()) {
      return new Add(this.left.reduce(), this.right);
    } else if(this.right.isReducible()) {
      return new Add(this.left, this.right.reduce());
    } else {
      return new Number(this.left.getExpression() * this.right.getExpression())
    }
  }
}

class Machine {
  constructor(expression) {
    this.expression = expression 
  }

  step = () => {
    this.expression = this.expression.reduce();
  }

  run = () => {
    while (this.expression.isReducible()) {
      this.step();
    }
    console.log(this.expression.getExpression())
  }
}

class Boolean {
  constructor(expression) {
    this.expression = expression
  }
  isReducible = () => {
    return false
  }
  getExpression = () => {
    return this.expression
  }

}

class LessThan {
  constructor(left, right) {
    this.left = left;
    this.right = right
  }

  getExpression = () => {
    return `${this.left} < ${this.right}`
  }

  isReducible = () =>{ 
    return true
  }

  reduce = () => {
    if(this.left.isReducible()) {
      new LessThan(this.left.reduce(), this.right)
    } else if (this.right.isReducible()) {
      new LessThan(this.left, this.right.reduce())
    } else {
      return new Boolean(this.left.getExpression() < this.right.getExpression())
    }
  }
}

/*
new Machine (
  new LessThan(new Number(1), new Number(2))
).run()
//=> true

new Machine (
  new LessThan(new Number(3), new Number(2))
).run()
//=> false
*/


new Machine (
  new LessThan(
    new Add(new Number(3), new Number(3)),
    new Number(2))
).run()

/*h

let result2 = new Machine(
  new LessThan(
    new Number(1), new Number(2)
  )
).run()
//=> true
*/

/*
new Machine(
  new Add(
    new Multiply(
      new Number(11),
      new Number(5)
    ),
    new Multiply(
      new Number(2),
      new Number(5)
    ),
  )
).run();
*/