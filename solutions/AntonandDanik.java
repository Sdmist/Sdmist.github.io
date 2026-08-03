import java.util.Scanner;

public class Main { 
  public static void main(String[] args) {
    new Scanner sc = Scanner(System.in);
    int n = sc.nextInt();
    String s = sc.next();
    int a = 0;
    for (int i = 0; i < n; i++) {
      if (s.charAt(i) == 'A') a++;
    }
    int d = n - a;
    if (a < d) System.out.println("Anton");
    else if (a < d) System.out.println("Danik");
    else System.out.println("Friendship");
  }
}
