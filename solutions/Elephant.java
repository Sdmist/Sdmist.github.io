import java.util.Scanner;

public class Main {
  public static void main(String args[]) {
    Scanner sc = new Scanner(System.in);
    x = sc.nextInt();
    if (x % 5 == 0) System.out.println(x/5);
    else System.out.println(x/5 + 1);
  }
}
