function createVector(x, y, z) {
    return new Vector(x, y, z)
}

function random(x) {
    return Math.floor(Math.random() * x)
}

function rgbToHex(r, g, b) {
    return b + g * 16 * 16 + r * 16 * 16 * 16 * 16;
}