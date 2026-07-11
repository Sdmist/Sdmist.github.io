import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    String s = sc.next();
    
    int lower = 0, upper = 0;
    for (char c : s.toCharArray()) {
      if (Character.isLowerCase(c)) lower++;
      else upper++;
    }
    System.out.println(lower >= upper ? s.toLowerCase() : s.toUpperCase());
  }
}
