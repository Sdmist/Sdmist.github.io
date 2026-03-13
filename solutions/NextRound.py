#Method-1: Simple Loop

n, k = map(int, input().split())
a = list(map(int, input().split()))

req_score = a[k-1]
count = 0
for x in a:
    if x >= req_score and x > 0:
        count += 1
    else:
        break
print(count)

#Method-2: Using sum() with generator expression

n, k = map(int, input().split())
a = list(map(int, input().split()))

req_score = a[k-1]
print(sum(1 for x in a if x >= req_score and x > 0))
#In fact we can just write 1 here, we can just write,
#sum(for x in a if x >= req_score and x > 0; here Python takes True = 1 & False = 0

#However mark that, this leads to transversal of the whole array

#Method-3: No need to count all

#if req_score != 0, k players pass by default
n, k = map(int, input().split())
a = list(map(int, input().split()))

if a[k-1] != 0:
    ans = k # + extra
else: 
    ans = k - a[:k].count(0) # + extra

#extra are those elements that may be equal to a[k-1] even after the k-1 index
extra = 0
i = k
while a[i] == a[k-1]:
    extra += 1
    i += 1
print(ans + extra)
    


        