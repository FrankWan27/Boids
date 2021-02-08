/// <reference path="../TSDef/p5.global-mode.d.ts" />

const MIN_FRAMERATE = 40
const MAX_FRAMERATE = 70
const POP_SIZE = 200
var flock
var targets = []

let windowVec

var seekSlider, separationSlider, alignSlider, cohesionSlider, sightSlider, resetButton
var showSight = false
const runningFps = []
var sightTimer = 0
var textBuffer 

function setup() {
    createCanvas(windowWidth, windowHeight);
    windowVec = createVector(windowWidth, windowHeight)
    seekSlider = createSlider(0, 4, 1.4, 0.1);
    seekSlider.position(20, 20)
    separationSlider = createSlider(0, 4, 1, 0.1);
    separationSlider.position(20, 50)
    alignSlider = createSlider(0, 4, 1, 0.1);
    alignSlider.position(20, 80)
    cohesionSlider = createSlider(0, 4, 0.7, 0.1);
    cohesionSlider.position(20, 110)
    sightSlider = createSlider(10, 500, 150, 10);
    sightSlider.position(20, 140)
    sightSlider.input(showSightTemp)
    resetButton = createButton('Reset');
    resetButton.position(20, 170);
    resetButton.mousePressed(resetTargets);
    flock = new Flock(POP_SIZE)
    textBuffer = createGraphics(200, 200);
    renderText()
}

function draw() {
    background(0);
    flock.flock.forEach(boid => {

        boid.think(targets, flock.flock)
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
    image(textBuffer, 0, 0)
    if(millis() > sightTimer) {
        showSight = false
    }
    checkFps()
}

function renderText() {
    textBuffer.fill(255)
    textBuffer.text("Seek Force", 20, 20)
    textBuffer.text("Separation Force", 20, 50)
    textBuffer.text("Alignment Force", 20, 80)
    textBuffer.text("Cohesion Force", 20, 110)
    textBuffer.text("Sight Radius", 20, 140)
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

function checkFps() {
    runningFps.push(frameRate())
    if(runningFps.length > 10) {
        runningFps.shift()
    }
    let avgFps = 0
    runningFps.forEach((value) => {
        avgFps += value
    })
    avgFps /= runningFps.length
    if(avgFps < MIN_FRAMERATE) {
        flock.remove(10)
    } else if(avgFps > MAX_FRAMERATE) {
        flock.add()
    }
}