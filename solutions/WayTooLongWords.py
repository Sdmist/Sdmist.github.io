n = int(input())
for _ in range(n): 
    s = input()
    if len(s) > 10:
        print(s[0] + str(len(s)-2) + s[-1])
    else:
        print(s)

"""
Some other methods for printing:, 
print("%s%i%s", s[0], len(s)-2, s[-1]), or 
print(f"{s[0]}{len(s)-2}{s[-1]")

