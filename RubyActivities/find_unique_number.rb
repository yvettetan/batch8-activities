# There is an array with some numbers. All numbers are equal except for one. Try to find it!
# Note: It’s guaranteed that array contains at least 3 numbers.
# Note: Avoid using .uniq method

def find_uniq(numbers_arr)
  unique = 0
  numbers_arr.map.group_by(&:itself).each_value do |v|
    unique = v[0].to_f if v.count < 2
  end
  unique
end

p find_uniq([1, 1, 1, 2, 1, 1]) == 2
p find_uniq([8, 8, 8, 8, 4.5, 8]) == 4.5
p find_uniq([2.5, 3, 2.5, 2.5, 2.5]) == 3
