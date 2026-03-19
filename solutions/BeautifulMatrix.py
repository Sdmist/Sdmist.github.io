for i in range(1, 5):
    A = list(map(int, input().split()))
    if 1 in A:
        i1 = i
        j1 = A.index(1) + 1
    
steps = abs(i1 - 3) + abs(j1 - 3)
print(steps)