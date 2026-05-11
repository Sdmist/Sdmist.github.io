#include <bits/stdc++.h>
using namespace std;

int main() {
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
