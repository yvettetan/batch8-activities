# Implement the function unique_in_order which takes as argument a sequence and returns a list of items without any elements
# with the same value next to each other and preserving the original order of elements.

def unique_in_order(sequence)
  p sequence.chunk(&:itself).map(&:first) if sequence.is_a?(Array)
  p sequence.squeeze!.split('') if sequence.is_a?(String)
end

unique_in_order('AAAAABBBCCDAABBB') # ["A", "B", "C", "D", "A", "B"]
unique_in_order('ABBCcAD') # ["A", "B", "C", "c", "A", "D"]
unique_in_order([1, 2, 2, 3, 3]) # [1, 2, 3]
