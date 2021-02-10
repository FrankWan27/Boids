/// <reference path="../node_modules/pixi.js/pixi.js.d.ts"/>

const MIN_FRAMERATE = 40
const MAX_FRAMERATE = 70
const POP_SIZE = 400
var flock
var targets = []

let windowVec

var seekMult, separationMult, alignMult, cohesionMult, sightRadius, resetButton
var showSight = false
const runningFps = []
var sightTimer = 0
var textBuffer 
const app = new PIXI.Application({ 
    antialias: true
  }
);

setup()

function setup() {
    //Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(app.view);
    app.renderer.autoDensity = true;
    app.renderer.resize(window.innerWidth, window.innerHeight);
    
    app.renderer.backgroundColor = [0, 0, 0];
    windowVec = createVector(window.innerWidth, window.innerHeight)
    seekMult = 1.4
    separationMult = 1
    alignMult = 1
    cohesionMult = 0.7
    sightRadius = 150
    flock = new Flock(POP_SIZE)
    app.ticker.add(delta => gameLoop(delta));
    app.renderer.plugins.interaction.on('pointerdown', addTarget)
}

function gameLoop(delta) {
    flock.flock.forEach(boid => {

        boid.think(targets, flock.flock)
        boid.update(delta)
        boid.draw()
    });
    
    checkFps()
}
window.onresize = function() {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    windowVec.x = window.innerWidth
    windowVec.y = window.innerHeight
}

window.addEventListener('keydown', event => {
    if(event.key == "r" || event.key == ' ') {
        resetTargets()
    }
})

function checkFps() {
    runningFps.push(app.ticker.FPS)
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