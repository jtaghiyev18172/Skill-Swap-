import java.util.Scanner;

public class Application {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int size, type, number, layer;
        float price = 0;
        System.out.print("Enter the size of the glass: ");
        size = scanner.nextInt();
        System.out.print("Enter the type of the glass: ");
        type = scanner.nextInt();
        System.out.print("Enter the number of the glass: ");
        number = scanner.nextInt();
        System.out.print("Enter the layer of the glass: ");
        layer = scanner.nextInt();
        if (size == 1) {
            if (type == 1) {
                if (layer == 1) {
                    price = 0.5f * number;
                } else if (layer == 2) {
                    price = 0.7f * number;
                }
            } else if (type == 2) {
                if (layer == 1) {
                    price = 0.6f * number;
                } else if (layer == 2) {
                    price = 0.8f * number;
                }
            }
        } else if (size == 2) {
            if (type == 1) {
                if (layer == 1) {
                    price = 0.7f * number;
                } else if (layer == 2) {
                    price = 0.9f * number;
                }
            } else if (type == 2) {
                if (layer == 1) {
                    price = 0.8f * number;
                } else if (layer == 2) {
                    price = 1.0f * number;
                }
            }
        }
        System.out.println("The price of the glass is: " + price);
    }
}

