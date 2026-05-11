#include <bits/stdc++.h>
using namespace std;

// Integer vector sorting

int main() {
  sync_with_stdio(false);
  cin.tie(nullptr);

  string s;
  cin >> s;
  int n = (s.size() + 1)/2;
  vector<int> v(n);
  for (int i = 0; i < s.size(); i += 2) {
    v[i/2] = s[i] - '0';
  }
  sort(v.begin(), v.end());
  for (int i = 0; i < n-1; i++) {
    cout << v[i] << "+";
  }
  cout << v[n-1];
  return(0);
}

//Direct characters sorting

int main() {
  sync_with_stdio(false);
  cin.tie(nullptr);

  string s;
  sort(s.begin(), s.end());
  bool first = true;
  for (char x: s) {
    if (!first) cout << "+";
    cout << x;
    first = false;
  }
  return(0);
}
    
