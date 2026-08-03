#include<bits/stdc++.h>
using namespace std;

int main() {
    ios :: sync_with_stdio(false);
    cin.tie(nullptr);
    
    int n;
    string s;
    cin >> n;
    cin >> s;
    int a = 0;
    for (char x: s) {
        if (x == 'A') a++;
    }
    int d = n - a;
    if (a > d) cout << "Anton";
    else if (a < d) cout << "Danik";
    else cout << "Friendship";
    return(0);
}
