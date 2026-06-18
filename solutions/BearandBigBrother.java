import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
         Scanner sc = new Scanner(System.in);
         int a = sc.nextInt();
         int b = sc.nextInt();

         int itr = 0:;
         while (a <= b) {
              a = 3*a;
              b = 2*b;
              itr++;
         }
         System.out.println(itr);
    }
}