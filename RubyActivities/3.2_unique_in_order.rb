# Implement the function unique_in_order which takes as argument a sequence and returns a list of items without any elements
# with the same value next to each other and preserving the original order of elements.

def unique_in_order(sequence)
  sequence.is_a?(Array) ? sequence.chunk(&:itself).map(&:first) : sequence.squeeze!.split('')
end

p unique_in_order('AAAAABBBCCDAABBB') == %w[A B C D A B]
p unique_in_order('ABBCcAD') == %w[A B C c A D]
p unique_in_order([1, 2, 2, 3, 3]) == [1, 2, 3]
p unique_in_order(%w[A A a B A C D D]) == %w[A a B A C D]
