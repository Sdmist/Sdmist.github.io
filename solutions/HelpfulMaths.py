#Integer list sorting
list_ = list(map(int, input().split('+')))
list_.sort()
print('+'.join(map(str, list_)))

#String sorting
s = input()
print('+'.join(x for x in sorted(x) if x != '+'))
