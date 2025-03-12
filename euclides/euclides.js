const get_euclides_minor_square = ((x, y) => {
    if (x === y) return x;

    // 640, 400 -> 400, 400; 240, 400 -> 240, 240; 240, 160 -> 160, 160 ...
    if (x > y) return get_euclides_minor_square(x - y, y);
    return get_euclides_minor_square(x, y - x);
})

const area = [1680, 640];

console.log(`The minor square possible to fill all the area measure ${get_euclides_minor_square(area[0], area[1])}`);