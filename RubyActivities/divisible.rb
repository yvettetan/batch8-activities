# Write a program that checks to see if the number
# is divisible by 2 and store them into a new array.

arr = [6, 3, 1, 8, 4, 2, 10, 65, 102]
puts(arr.select { |i| i.even? })
