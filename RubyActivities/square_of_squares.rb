def perfect_square(number)
  square_root = number**0.5
  if number.negative?
    puts "#{number} is a not perfect square"
  elsif number.zero? || square_root.modulo(1).zero?
    puts "#{number} is a perfect square"
  else
    puts "#{number} is not a perfect square"
  end
end

perfect_square(-1)
perfect_square(0)
perfect_square(3)
perfect_square(4)
perfect_square(25)
perfect_square(26)
