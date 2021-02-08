/// <reference path="../TSDef/p5.global-mode.d.ts" />

const POP_SIZE = 200
const flock = []
var targets = []

let windowVec

var seekSlider, separationSlider, alignSlider, cohesionSlider, sightSlider, resetButton
var showSight = false
var sightTimer = 0
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
    sightSlider = createSlider(10, 500, 200, 10);
    sightSlider.position(20, 140)
    sightSlider.input(showSightTemp)
    resetButton = createButton('Reset');
    resetButton.position(20, 170);
    resetButton.mousePressed(resetTargets);

    for (let i = 0; i < POP_SIZE; i++) {
        flock.push(new Boid(i < POP_SIZE * 0.1));
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
        push()
        strokeWeight(10)
        stroke(target.color)
        point(p5.Vector.mult(target.position, windowVec))
        pop()
    })
    renderText()
    if(millis() > sightTimer) {
        showSight = false
    }
}

function renderText() {
    push()
    fill(255)
    text("Seek Force: " + seekSlider.value(), 20, 20)
    text("Separation Force: " + separationSlider.value(), 20, 50)
    text("Alignment Force: " + alignSlider.value(), 20, 80)
    text("Cohesion Force: " + cohesionSlider.value(), 20, 110)
    text("Sight Radius: " + sightSlider.value(), 20, 140)
    pop()
}

function showSightTemp() {
    showSight = true
    sightTimer = millis() + 1000
}

/* full screening will change the size of the canvas */
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    windowVec.x = windowWidth
    windowVec.y = windowHeight
}


