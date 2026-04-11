import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        int n = sc.nextInt();
        int ans = 0;
        while (n-- > 0) {
            int cnt_1 = 0;
            for (int i = 0; i < 3; i++) {
                int x = sc.nextInt();
                if (x == 1) cnt_1 += 1;
            }
            if (cnt_1 > 1) ans += 1;
        }
        System.out.println(ans);
    }
}