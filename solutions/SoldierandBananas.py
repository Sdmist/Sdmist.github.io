k, n, w = map(int, input().split())
req = ((w*(w+1))//2)*k
borrow = req - n
print(max(0, borrow))
