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
    return `${this.left.do()} + ${this.right.do()}`
  }
  isReducible = () => {
    return true
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
  isReducible = () => {
    return true
  }
}

console.log(new Add(new Number(1),new Number(2)).isReducible())
//=> true

console.log(new Number(1).isReducible())
//=> false