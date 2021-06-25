# frozen_string_literal: true

# Write a program that takes a number from the user
# between 0 and 100 and reports back whether the number
# is between 0 and 50, 51 and 100, or above 100
def ask
  question = 'Enter a number between 0 to 100'
  puts question
  number = gets.to_i
  between(number)
end

def between(number)
  if number.negative?
    puts 'Invalid input.'
    ask
  elsif number <= 50
    puts 'Number is between 0 and 50'
  elsif number <= 100
    puts 'Number is between 51 and 100'
  else
    puts 'Number is above 100'
  end
end

ask
