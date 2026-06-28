s = input()
lower = 0 
upper = 0

for x in s:
  if x.islower(): lower += 1
  else: upper += 1

if lower >= upper: print(s.lower())
else: print(s.upper())
