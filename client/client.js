var socket = io() 
var myColor
function mouseClicked() {
    if(mouseX < 200 && mouseY < 200) { //sliders + reset button
        return
    }
    
    socket.emit('add-target', {
        x: mouseX / windowWidth,
        y: mouseY / windowHeight,
        color: myColor
    })
}

socket.on('update-targets', (data) => {
    targets = []
    data.forEach(target => {
        targets.push({
            position: createVector(target.x, target.y),
            color: target.color
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
