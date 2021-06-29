# Polymorphism by Inheritance
class Pet
  def initialize(breed, name)
    @breed = breed
    @name = name
  end

  def greet
    puts "Hi, I'm #{@name} and I'm a #{@breed}."
  end
end

class Dog < Pet
  def greet
    puts "Woof, I'm #{@name} and I'm a #{@breed}."
  end
end

class Cat < Pet
  def greet
    puts "Meow, I'm #{@name} and I'm a #{@breed}."
  end
end

togo = Dog.new('Siberian Husky', 'Togo')
togo.greet
marie = Cat.new('Turkish Angora', 'Marie')
marie.greet

# Polymorphism using duck-typing
class Transportation
  def type(transportation)
    transportation.type
  end
end

class Car
  def type
    puts 'I have 4 wheels.'
  end
end

class Bike
  def type
    puts 'I have 2 wheels.'
  end
end

road_vehicle = Transportation.new
toyota = Car.new
road_vehicle.type(toyota)
merida = Bike.new
road_vehicle.type(merida)
