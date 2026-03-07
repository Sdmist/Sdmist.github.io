#include <bits/stdc++.h>
using namespace std;

int main() {
	ios:: sync_with_stdio(false);
	cin.tie(nullptr);

	int n; 
	cin >> n;
	
	while (n--) {
	    string s;
	    cin >> s;
	    
	    if (s.size() > 10) {
	        cout << s[0] << s.size()-1 << s.back();
	    }
	    else {
	        cout << s;
	    }
	    cout << '\n';
	}
	return(0);
}