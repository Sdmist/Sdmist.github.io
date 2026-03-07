import sys

input = sys.stdin.readline

n = int(input())
count =  0
for p in range(n):
    s = input().strip()
    if s.count("1") >= 2:
        count += 1
print(count)

