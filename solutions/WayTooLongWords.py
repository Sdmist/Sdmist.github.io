#Method-1: Map Approach 

n = int(input())
ans = 0
for _ in range(n):
    A = map(int, input().split())
    cnt1 = 0
    for x in A: 
        if x == 1: cnt1 += 1
    if cnt1 >= 2:
        ans += 1
print(ans)

#Method-2: List Approach

n = int(input())
ans = 0
for _ in range(n): 
    list_ = list(map(int, input().split()))
    if list_.count(1) >= 2:
        ans += 1
print(ans)

#Method-3: String Approach

n = int(input())
ans = 0
for _ in range(n):
    s = input()
    if s.count('1') >= 2:
        ans += 1
print(ans)


