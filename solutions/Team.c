#include <stdio.h>

int main() {
    int n;
    scanf("%d",  &n);
    int ans = 0;
    while (n--) {
        int x; 
        int cnt1 = 0;
        
        for (int i = 0; i < 3; i++) {
            scanf("%d", &x);
            if (x == 1) cnt1 += 1;
        }
        if (cnt1 >= 2) ans += 1;
    }
    printf("%d \n", ans);
    
    return(0);
}