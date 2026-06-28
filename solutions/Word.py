#==========================
#Method-1: Using .islower()
#==========================

s = input()
lower, upper = 0, 0

for x in s:
  if x.islower(): lower += 1
  else: upper += 1

if lower >= upper: print(s.lower())
else: print(s.upper())

#===========================
#Method-2: Using ord() 
#===========================

s = input()
lower, upper = 0, 0

for x in s:
  if 0 <= ord(x) - ord('a') < 26: lower +=1
  else: upper += 1

if lower >= upper: print(s.lower())
else: print(s.upper())
