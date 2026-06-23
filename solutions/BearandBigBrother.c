#include <stdio.h>

int main() {
    int a, b;
    scanf("%d %d", &a, &b);
    int itr = 0;
    while (a <= b) {
        a = 3*a;
        b = 2*b;
        itr++;
    }
    printf("%d \n", itr);
    return(0);
}