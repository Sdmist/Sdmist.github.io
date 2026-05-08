import java.util.Scanner;

public class Main {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        int x;
        int i1 = 0, j1 = 0;
        
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < 5; j++) {
                x = sc.nextInt();
                if (x == 1) {
                    j1 = j + 1;
                    i1 = i + 1;
                }
            }
        }
        System.out.println(Math.abs(3-i1) + Math.abs(3-j1));
    }
}