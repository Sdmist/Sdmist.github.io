import sys

n = int(sys.stdin.readline())
for p in range(n):
    string = sys.stdin.readline().strip()
    if len(string) > 10:
        print(string[0]+ str(len(string) - 2) + string[-1])
    else:
        print(string)
