#include <bits/stdc++.h>
using namespace std;

int main() {
	ios:: sync_with_stdio(false);
	cin.tie(nullptr);

	int w;
	cin >> w;

	if (w != 2 and w % 2 == 0) {
		cout << "YES" << '\n';
	}
	else {
		cout << "NO" << '\n';
	}
	return(0);
}