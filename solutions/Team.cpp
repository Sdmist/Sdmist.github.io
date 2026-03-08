#include<bits/stdc++.h>
using namespace std;

int main() {
	ios:: sync_with_stdio(false);
	cin.tie(nullptr);

	int n;
	cin >> n;

	int ans = 0;
	while (n--) {
		int x;
		int cnt1 = 0;
		for (int i = 0; i < 3; i++) {
			cin >> x;
			if (x == 1) cnt1++;
		}
		if (cnt1 >= 2) ans++;
	}
	cout << ans << '\n';

	return(0);
}