puts "Enter a number to check if it\'s a perfect square"
number = gets.chomp.to_i
if number.negative?
  puts "#{number} is a not perfect square"
else
  square_root = number**0.5
  if square_root * square_root == number
    puts "#{number} is a perfect square"
  else
    puts "#{number} is not a perfect square"
  end
end
