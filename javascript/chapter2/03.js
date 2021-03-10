// 簡約可能かどうかを返すisReducibleを追加

class Number {
  constructor(value) {
    this.value = value
  }
  do = () => {
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
  do = () => {
    return this.left.do() + this.right.do()
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
      return new Number(this.left.do() + this.right.do())
    }
  }
}

class Multiply {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
  do = () => {
    return this.left.do() * this.right.do()
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
      return new Number(this.left.do() * this.right.do())
    }
  }
}

let result =
  new Add(
    new Multiply(
      new Number(11),
      new Number(5)
    ),
    new Multiply(
      new Number(1),
      new Number(5)
    ),
  )

console.log(result.reduce())

result = result.reduce();

console.log(result.reduce())

result = result.reduce();

console.log(result.reduce())

result = result.reduce();