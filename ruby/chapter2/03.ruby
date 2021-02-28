# 簡約を行うreduceを追加
# まず、左の引数が簡約可能なら簡約を行う
# 右の引数が簡約可能なら簡約を行う
# どちらも簡約できないのであれば、足し算ないし掛け算を行う

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
    "#{left} + #{right}"
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
    "#{left} * #{right}"
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

foo = Add.new(
  Multiply.new(Number.new(1), Number.new(2)),
  Multiply.new(Number.new(3), Number.new(4))
)

#
# reduceを実行しながら、スモールステップで計算していく
#

puts foo
#=> 1 * 2 + 3 * 4

puts foo.reducible?
#=> true

puts foo = foo.reduce
#=> 1 * 2が計算される
#=> 2 + 3 * 4

puts foo.reducible?
#=> true

puts foo = foo.reduce
#=> 2 + 14

puts foo.reducible?
#=> true

puts foo = foo.reduce
#=> 14

puts foo.reducible?
#=> false
