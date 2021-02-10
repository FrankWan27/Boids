var socket = io() 
var myColor

function addTarget(event) {
    if(!myColor) {
        return
    }
    let mouseX = event.data.global.x
    let mouseY = event.data.global.y
    
    socket.emit('add-target', {
        x: mouseX / (app.screen.width),
        y: mouseY / (app.screen.height),
        color: myColor
    })
}

socket.on('update-targets', (data) => {
    targets.forEach(target => {
        app.stage.removeChild(target.sprite)
    })
    targets = []
    data.forEach(target => {
        
        let circle = new PIXI.Graphics();
        let hex = rgbToHex(target.color[0], target.color[1], target.color[2])
        circle.beginFill(hex, 0.6);
        circle.drawCircle(0, 0, 6);
        circle.endFill();
        let pos = Vector.mult(createVector(target.x, target.y), windowVec)
        circle.position.set(pos.x, pos.y)
        app.stage.addChild(circle);

        targets.push({
            position: createVector(target.x, target.y),
            sprite: circle
        })
    })
})

socket.on('set-color', (data) => {
    console.log(data)
    myColor = data
})

function resetTargets() {
    socket.emit('reset-targets')
}
