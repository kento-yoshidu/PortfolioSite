// 簡約可能かどうかを返すisReducibleを追加

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
      console.log(this.expression.getExpression())
      this.step();
    }
    console.log(this.expression.getExpression())
  }
}

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