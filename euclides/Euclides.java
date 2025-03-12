package euclides;

public class Euclides {
    public static void main(String[] args) {
        System.out.println(getEuclidesMinorSquare(1680, 640));   // 80
    }

    public static int getEuclidesMinorSquare(int x, int y) throws IllegalArgumentException{
        if (x <= 0 || y <= 0) throw new IllegalArgumentException("X and Y must be positive values");
        if (x == y) return x;
        if (x > y) return getEuclidesMinorSquare(x - y, y);
        return getEuclidesMinorSquare(x, y - x);
    }
}
