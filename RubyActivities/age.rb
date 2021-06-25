years = [10, 20, 30, 40]
puts 'How old are you?'
age = gets.chomp.to_i
years.each do |num|
  current_age = age + num
  puts "In #{num} years, you will be #{current_age}"
end
