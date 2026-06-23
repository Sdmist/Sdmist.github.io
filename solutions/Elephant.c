#include <stdio.h>

int main() {
  int x, ans;
  scanf("%d", &x);
  if (x % 5 == 0) printf("%d", x/5);
  else ans = printf("%d", x/5 + 1);
  return(0);
} 
