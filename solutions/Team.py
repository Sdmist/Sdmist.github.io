import sys

n = int(sys.stdin.readline())
count =  0
for p in range(n):
    string = sys.stdin.readline().strip()
    if string.count("1") >= 2:
        count += 1
print(count)

