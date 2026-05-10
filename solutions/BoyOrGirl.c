#include <stdio.h>
#include <stdbool.h>

int main() {
    char s[100];
    scanf("%s", &s);
    bool seen[26] = {false};
    
    for (int i = 0; s[i] != '\0'; i++) {
        seen[s[i] - 'a'] = true;
    }
  
    int unique = 0;
    for (int i = 0; i < 26; i++) {
        if (seen[i]) unique++;
    }
    
    if(unique % 2 == 0) printf("CHAT WITH HER!");
    else printf("IGNORE HIM!");

    return(0);
}
