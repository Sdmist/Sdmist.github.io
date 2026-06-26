import java.util.Scanner;

public class Main {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        int k, n, w;
        k = sc.nextInt();
        n = sc.nextInt();
        w = sc.nextInt();
        
        int req = ((w*(w+1))/2)*k;
        int borrow = Math.max(0, req - n);
        System.out.println(borrow);
    }
}