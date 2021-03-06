# 小なり演算子の実装

class Number < Struct.new(:value)
  def to_s
    value.to_s
  end

  def inspect
    "<< #{self} >>"
  end

  def reducible?
    false
  end
end

class Add < Struct.new(:left, :right)
  def to_s
    "(#{left} + #{right})"
  end

  def inspect
    "<< #{self} >>"
  end

  def reducible?
    true
  end

  def reduce
    if left.reducible?
      Add.new(left.reduce, right)
    elsif right.reducible?
      Add.new(left, right.reduce)
    else
      Number.new(left.value + right.value)
    end
  end
end

class Multiply < Struct.new(:left, :right)
  def to_s
    "(#{left} * #{right})"
  end

  def inspect
    "<< #{self} >>"
  end

  def reducible?
    true
  end

  def reduce
    if left.reducible?
      Add.new(left.reduce, right)
    elsif right.reducible?
      Add.new(left, right.reduce)
    else
      Number.new(left.value * right.value)
    end
  end
end

class Machine < Struct.new(:expression)
  def step
    self.expression = expression.reduce
  end

  def run
    while expression.reducible?
      puts expression
      step
    end
  puts expression
  end
end

class Boolean < Struct.new(:value)
  def to_s
    value.to_s
  end

  def inspect
    "<<#{self}>>"
  end

  def reducible?
    false
  end
end

class LessThan < Struct.new(:left, :right)
  def to_s
    "<< #{left} < #{right} >>"
  end

  def inspect
    "<< #{self} >>"
  end

  def reducible?
    true
  end

  def reduce
    if left.reducible?
      LessThan.new(left.reduce, right)
    elsif right.reducible?
      LessThan.new(left, right.reduce)
    else
      Boolean.new(left.value < right.value)
    end
  end
end

Machine.new(
  LessThan.new(Number.new(1), Number.new(5))
).run
#=> << 1 < 5 >>
#=> true

Machine.new(
  LessThan.new(Number.new(5), Number.new(2))
).run
#=> << 5 < 2 >>
#=> false

Machine.new(
  LessThan.new(
    Add.new(Number.new(5), Number.new(2)),
    Add.new(Number.new(5), Number.new(1))
  )
).run

=begin
<< (5 + 2) < (5 + 1) >>
<< 7 < (5 + 1) >>
<< 7 < 6 >>
false
=end

Machine.new(
  LessThan.new(
    Multiply.new(Number.new(5), Number.new(2)),
    Add.new(Number.new(5), Number.new(1))
  )
).run
=begin
<< (5 * 2) < (5 + 1) >>
<< 10 < (5 + 1) >>
<< 10 < 6 >>
false
=end