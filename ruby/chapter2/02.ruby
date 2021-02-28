# 簡約可能かどうかを返すreducible?を追加
# Numberはひとつの数字で簡約不可なのでfalse
# AddとMultiplyは2つの数字からなる式で簡約可能なのでtrue

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
end

puts Add.new(1,3).reducible?
#=> true

puts Number.new(1).reducible?
#=> false