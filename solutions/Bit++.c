//Method-1: Index comparison

#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    int x = 0
    char s[4];
    while (n--) {
        scanf("%s", s);
        if (s[1] == '+') x++;
        else x--;
    }
    printf("%d", x);
    printf("\n");
    
    return(0);
}

//Method-2: Full string comparison

#include <stdio.h>
#include <string.h>

int main() {
    int n;
    scanf("%d", &n);
    int x = 0;
    char s[5];
    while (n--) {
        scanf("%s", s);
        //strcmp gives the differece between ASCII code of first different characters
        //positive -> first string is lexigrophically bigger
        //negative -> first string is lexigrophically smaller
        //So it return 0 when the strings are equal
        if (strcmp(s, "X++") == 0 || strcmp(s, "++X") == 0) {
            printf("YES");
            x++;
        }
        else {
            printf("NO");
            x--;
        }
    }
    printf("%d", x);
    printf("\n");
    
    return(0);
}
