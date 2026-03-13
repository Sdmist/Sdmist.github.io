#include <bits/stdc++.h> 
using namespace std;

int main() {
    ios :: sync_with_stdio(false);
    cin.tie(nullptr);
    
    int n, k;
    cin >> n >> k;
    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i] ;
    }
    int cnt = 0;
    for (const int &x : a) {
        if (x > 0 && x >= a[k-1]) cnt++;
        else break;
    }
    cout << cnt << "\n";
    return(0);
}