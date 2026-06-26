#include <bits/stdc++.h>
using namespace std;

int main() {
    ios :: sync_with_stdio(false);
    cin.tie(nullptr);
    
    int k, n, w;
    cin >> k >> n >> w;
    int req = ((w*(w+1))/2)*k;
    int borrow = max(0, req - n);
    cout << borrow;
    return(0);
}
