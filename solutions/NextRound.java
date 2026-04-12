import java.util.Scanner;

public class Main {
    static int solve(int n, int k, int[] a) {
        int ans = 0;
        for(int i = 0; i < n; i++) {
            if (a[i] > 0 && a[i] >= a[k-1]) {
                ans += 1;
            }
        }
        return ans;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) {
            a[i] = sc.nextInt();
        }
        
        int ans = solve(n, k, a);
        System.out.println(ans);
    }
}