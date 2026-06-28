#include <stdio.h>
#include <string.h>
#include <ctype.h> 

int main() {
    char s[105];
    scanf("%s", s);
    int n = strlen(s);
    
    int lower = 0, upper = 0;
    
    for (int i = 0; i < n; i++) {
        if (islower(s[i])) lower++;
        else upper++;
    }
    
    if (lower >= upper) {
        for (int i = 0; i < n; i++) {
            printf("%c", tolower(s[i]));
        }
    }
    else {
        for (int i = 0; i < n; i++) {
            printf("%c", toupper(s[i]));
        }
    }
    return(0);
}