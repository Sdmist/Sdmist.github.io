#include <stdio.h> 
#include <ctype.h> 

int main() {
  char s[1005];
  scanf("%s", s);
  printf("%c", toupper(s[0]));
  for (int i = 1; s[i] != '\0'; i++) {
    printf("%c", s[i]);
  }
  printf("\n");
  return(0);
}

  
