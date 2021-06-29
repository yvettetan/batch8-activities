arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15]

if arr.length.zero?
  puts []
else
  positive_arr = arr.find_all { |num| num > 0 }
  negative_arr = arr.find_all { |num| num < 0 }
  sum_neg = 0
  negative_arr.each { |num| sum_neg += num }
  count_arr = [positive_arr.length, sum_neg]
  p count_arr
end
