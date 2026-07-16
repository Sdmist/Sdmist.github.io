n = input() #input as string
cnt = 0
for x in n:
  if x in ('4', '7'):
    cnt += 1
if cnt == 4 or cnt == 7:
  print("YES")
else:
  print("NO")
