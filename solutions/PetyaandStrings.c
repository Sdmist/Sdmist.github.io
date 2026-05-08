#include<stdio.h>
#include<string.h>
#include<ctype.h> 

int main() {
    char s1[105], s2[105];
    scanf("%s", &s1);
    scanf("%s", &s2);
    
    int ans = 0;
    int n = strlen(s1);
    for (int i = 0; i < n; i++) {
        char c1 = tolower(s1[i]);
        char c2 = tolower(s2[i]);

        if (c1 < c2) {
            ans = -1;
            break;
        else if (c1 > c2) {
            ans = 1;
            break;
        }
    }
    printf("%d", ans);
    return(0);
}
