#include <stdio.h> 

int main() {
    int k, n, w;
    scanf("%d %d %d", &k, &n, &w);
    int req = ((w*(w+1))/2)*k;
    int borrow = (req > n) ? req - n : 0;
    printf("%d", borrow);
    return(0);
}