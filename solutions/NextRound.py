#===============================================
#Method-1: Simple Loop
#===============================================

n, k = map(int, input().split())
a = list(map(int, input().split()))

req_score = a[k-1]
cnt = 0
for x in a:
    if x >= req_score and x > 0: cnt += 1
    else: break
print(count)

#=================================================
#Method-2: Using sum() with generator expression
#=================================================

n, k = map(int, input().split())
a = list(map(int, input().split()))

req_score = a[k-1]
print(sum(1 for x in a if x >= req_score and x > 0))
"""
+In fact we can just write 1 here, we can just write,
+sum(for x in a if x >= req_score and x > 0; here Python takes True = 1 & False = 0
+However mark that, this leads to transversal of the whole array
"""

#==================================================
#Method-3: Count only if 0
#==================================================

#if req_score != 0, k players pass by default
def solve(n, k, a):
    if a[k-1] != 0:
        return(k)
    else:
        return(a.count(0))

n, k = map(int, input().split())
a = list(map(int, input().split()))

ans = solve(n, k, a)
print(ans)

    


        
