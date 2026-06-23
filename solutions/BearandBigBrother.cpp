#include <bits/stdc++.h>
using namespace std;

int main() {
    ios :: sync_with_stdio(false);
    cin.tie(nullptr);
    
    int a, b;
    cin >> a >> b;
    int itr = 0;
    while (a <= b) {
        a = 3*a;
        b = 2*b;
        itr++;
    }
    cout << itr << "\n";
    return(0);
}