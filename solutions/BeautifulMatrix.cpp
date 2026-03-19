#include <bits/stdc++.h>
using namespace std;

int main() {
    ios :: sync_with_stdio(false);
    cin.tie(nullptr);
    
    int x, i1, j1;
    
    for (int i = 0; i < 5; i++) {
        for (int j = 0; j < 5; j++) {
            cin >> x;
            if (x == 1) {
                i1 = i+1;
                j1 = j+1;
            }
        }
    }
    cout << abs(i1-3) + abs(j1-3) << '\n';
    
    return(0);
}