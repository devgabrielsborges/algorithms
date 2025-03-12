#include <stdio.h>

int get_euclides_minor_square(int x, int y);

int main() {
    printf("the minor square is %d\n", get_euclides_minor_square(1680, 640));
}

int get_euclides_minor_square(int x, int y) {
    if (x <= 0 || y <= 0) return 0;
    if (x == y) return x;
    if (x > y) return get_euclides_minor_square(x - y, y);
    return get_euclides_minor_square(x, y - x);
}