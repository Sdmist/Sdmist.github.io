list_ = list(map(int, input().split('+')))
list_.sort()
print('+'.join(map(str, list_)))
