a, b = map(int, input().split())

itr = 0
while a <= b:
   a = 3*a
   b = 2*b
   itr += 1
print(itr)