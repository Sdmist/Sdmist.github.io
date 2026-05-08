#========================================
#Metod-1: Using built in .lower()
#========================================

#Converts both the inputs  to lowercase strings. 

s1 = input().lower()
s2 = input().lower()

if s1 < s2: print(-1)
elif s1 > s2: print(1)
else: print(0)


#========================================
#Method-2: Using ord()
#========================================

#ord() gives the Unicode integer of characters.
#Capital and small aphabets have a integer diff of 32.

s1 = input()
s2 = input()

ans = 0 
for x, y in zip(s1, s2):
  diff = ord(s1) - ord(s2)
  if diff == 0 or diff = 32:
    #same alphabets(capital or small)
    continue
  elif diff < 0:
    ans = -1; break;
  else:
    ans = 1; break; 
    
print(ans)

  
#=========================================
#Method-3: Using raw instinct
#=========================================

#We use indexes for lexographical comparison.

def my_func(s1, s2):
    small = "abcdefghijklmnopqrstuvwxyz"
    big = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    
    n = len(s1)
    for i in range(n):
      if s1[i] in small: 
        index1 = small.find(s1[i])
      else:
        index1 = big.find(s1[i])
      
      if s2[i] in small:
        index2 = small.find(s2[i])
      else:
        index2 = big.find(s2[i])
        
      if index1 < index2 : return(-1)
      elif index1 > index2 : return(1)
      
    return(0)

s1 = input()
s2 = input()

ans = my_func(s1, s2)
print(ans)
