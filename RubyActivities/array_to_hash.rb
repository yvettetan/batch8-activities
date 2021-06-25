contact_data = [['ana@email.com', '123 Main st.', '555-123-4567'],
                ['avion@email.com', '404 Not Found Dr.', '123-234-3454']]
contacts = { 'Analyn Cajocson' => {}, 'Avion School' => {} }

contact_data.each do |data|
  first_name = data[0][0, data[0].index('@')].capitalize
  contacts.each_pair do |key, _value|
    contacts[key] = { email: data[0], address: data[1], phone: data[2] } if key.include? first_name
  end
end
puts contacts
