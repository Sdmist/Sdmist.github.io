import java.util.Scanner;

public class Main {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        String s1 = sc.next().toLowerCase();
        String s2 = sc.next().toLowerCase();
        
        int cmp = s1.compareTo(s2);
        
        int ans = 0;
        if (cmp < 0) ans = -1;
        else if (cmp > 0) ans = 1;
        
        System.out.println(ans)
    }
}
