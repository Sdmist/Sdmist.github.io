n = int(input())
s = input()
a = s.count('A')
d = n - a
if a > d: print("Anton")
elif a < d: print("Danik")
else: print("Friendship")
