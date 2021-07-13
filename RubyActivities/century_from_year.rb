def century_from_year(year)
  year % 100 != 0 ? (year / 100) + 1 : year / 100
end

p century_from_year(90) == 1
p century_from_year(101) == 2
p century_from_year(1705) == 18
p century_from_year(1900) == 19
p century_from_year(1601) == 17
