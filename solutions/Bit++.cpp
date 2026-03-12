#include <bits/stdc++.h>
using namespace std;

int main() {
    ios:: sync_with_stdio(false);
    cin.tie(nullptr);
    
    int n;
    cin >> n;
    
    int x = 0;
    string s;
    while (n--) {
        cin >> s;
        if (s[1] == '+') x++;
        else x--;
    }
    cout << x << "\n";
    return(0);
}