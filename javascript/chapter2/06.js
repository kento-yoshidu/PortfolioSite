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
  reduce = (environment) => {
    if(this.left.isReducible()) {
      return new Add(this.left.reduce(environment), this.right);
    } else if(this.right.isReducible()) {
      return new Add(this.left, this.right.reduce(environment));
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
  reduce = (environment) => {
    if(this.left.isReducible()) {
      return new Add(this.left.reduce(environment), this.right);
    } else if(this.right.isReducible()) {
      return new Add(this.left, this.right.reduce(environment));
    } else {
      return new Number(this.left.getExpression() * this.right.getExpression())
    }
  }
}

class Machine {
  constructor(expression, environment) {
    this.expression = expression 
    this.environment = environment
  }

  step = () => {
    this.expression = this.expression.reduce(this.environment);
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
    console.log(`${this.left.getExpression()} < ${this.right.getExpression()} ?`)
    if(this.left.isReducible()) {
      return new LessThan(this.left.reduce(), this.right)
    } else if (this.right.isReducible()) {
      return new LessThan(this.left, this.right.reduce())
    } else {
      return new Boolean(this.left.getExpression() < this.right.getExpression())
    }
  }
}

class Variable {
  constructor(name) {
    this.name = name;
  }

  isReducible = () => {
    return true
  }

  reduce = (environment) => {
    return new Number(environment[this.name]);
  }
}

const obj = {
  x: 5,
  y: 3
}

new Machine(
  new Add(
    new Variable("x"),
    new Variable("y")
  ),
  obj
).run();
