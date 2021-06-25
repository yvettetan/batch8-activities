# frozen_string_literal: false

# Write a while loop that takes input from the user,
# performs an action, and only stops when the user types
# "STOP". Each loop can get info from the user

question = 'What is your name?'
puts question
user_input = gets.chomp
while user_input
  if user_input == 'STOP'
    puts 'Goodbye'
    break
  else
    puts "Hello, #{user_input}"
    puts question
    user_input = gets.chomp
  end
end
