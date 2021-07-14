def list_names(list)
  name_arr = list.map { |name| name[:name].to_s }
  list.length > 1 ? name_arr.join(', ').reverse.sub(',', '& ').reverse : list[0][:name]
end

p list_names([{ name: 'Bart' }]) == 'Bart'
p list_names([{ name: 'Bart' }, { name: 'Lisa' }]) == 'Bart & Lisa'
p list_names([{ name: 'Bart' }, { name: 'Lisa' }, { name: 'Maggie' }]) == 'Bart, Lisa & Maggie'
