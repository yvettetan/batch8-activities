# Implement the function unique_in_order which takes as argument a sequence and returns a list of items without any elements
# with the same value next to each other and preserving the original order of elements.

def unique_in_order(sequence)
  i = 0
  y = i + 1
  while i < sequence.length
    if sequence[i] == sequence[y]
      sequence.is_a?(String) ? sequence.squeeze!(sequence[y]) : sequence.delete_at(y)
    end
    i += 1
    y += 1
  end
  p sequence.split('') if sequence.is_a?(String)
  p sequence if sequence.is_a?(Array)
end

unique_in_order('AAAAABBBCCDAABBB') # ["A", "B", "C", "D", "A", "B"]
unique_in_order('ABBCcAD') # ["A", "B", "C", "c", "A", "D"]
unique_in_order([1, 2, 2, 3, 3]) # [1,2,3]
