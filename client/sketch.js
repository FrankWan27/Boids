/// <reference path="../TSDef/p5.global-mode.d.ts" />

const flock = []
var targets = []

let windowVec

var seekSlider, separationSlider, alignSlider, cohesionSlider
function setup() {
    createCanvas(windowWidth, windowHeight);
    windowVec = createVector(windowWidth, windowHeight)
    seekSlider = createSlider(0, 2, 1, 0.1);
    seekSlider.position(20, 20)
    separationSlider = createSlider(0, 2, 1, 0.1);
    separationSlider.position(20, 50)
    alignSlider = createSlider(0, 2, 1, 0.1);
    alignSlider.position(20, 80)
    cohesionSlider = createSlider(0, 2, 1, 0.1);
    cohesionSlider.position(20, 110)

    for (let i = 0; i < 200; i++) {
        flock.push(new Boid());
    }
}
function draw() {
    background(0);
    flock.forEach(boid => {

        boid.think(targets, flock)
        boid.update()
        boid.draw()
        //console.log(boid.acceleration)
    });
    targets.forEach(target => {
        strokeWeight(10)
        stroke(target.color)
        point(p5.Vector.mult(target.position, windowVec))
    })
}

/* full screening will change the size of the canvas */
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    windowVec.x = windowWidth
    windowVec.y = windowHeight
}


