n = int(input())
#initialize the value of x
x = 0
for _ in range(n):
    s = input()
    if s[1] == '+':
        x += 1
    else:
        x -= 1
print(x)
