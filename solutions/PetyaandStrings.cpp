#include<bits/stdc++.h>
using namespace std;

int main() {
    ios :: sync_with_stdio(false);
    cin.tie(nullptr);
    
    string s1, s2;
    cin >> s1 >> s2;
    
    int ans = 0; 
    for (int i = 0; i < s1.size(); i++) {
        char c1 = tolower(s1[i]);
        char c2 = tolower(s2[i]);
        
        if (c1 < c2) {
            ans = -1;
            break;
        else if (c1 > c2) {
            ans = 1;
            break;
    }
    cout << ans << "\n";
}
