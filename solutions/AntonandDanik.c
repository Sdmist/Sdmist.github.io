#include <stdio.h>

int main() {
  int n;
  char s[105]; 
  scanf("%d", &n);
  scanf("%s", s);
  int a;
  for (int i = 0; i < n; i++) {
    if (s[i] == 'A') a++;
  }
  int d = n - a;
  if (a > d) printf("Anton");
  else if (a < d) printf("Dankik");
  else printf("Friendship");
  return(0);
}
