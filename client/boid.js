
class Boid {
	constructor(debug, location) {
        if(location) {
            this.position = location
        } else {
            this.position = createVector(random(window.innerWidth), random(window.innerHeight))
        }
        this.velocity = createVector()
        this.acceleration = createVector()
        this.size = 3
        this.maxSpeed = 10
        this.maxForce = 0.1
        this.targetIndex = 0
        this.debug = debug
        this.sprite = this.drawSprite()
    }

    think(targets, flock) {

        let seekForce = createVector()
        targets.forEach(target => {
            seekForce.add(this.seek(Vector.mult(target.position, windowVec)))
        })

        let [separationForce, alignForce, cohesionForce] = this.calculateForces(flock)

        seekForce.mult(seekMult)
        separationForce.mult(separationMult)
        alignForce.mult(alignMult)
        cohesionForce.mult(cohesionMult)

        this.applyForce(seekForce)
        this.applyForce(separationForce)
        this.applyForce(alignForce)
        this.applyForce(cohesionForce)
    }

    seek(target) {
        let desired = Vector.sub(target, this.position)
        desired.limit(this.maxSpeed)
        let steer = Vector.sub(desired, this.velocity)
        steer.limit(this.maxForce)
        return steer
    }

    calculateForces(flock) {
        let close = 0
        let totalSeparationForce = createVector()
        let totalAlignForce = createVector()
        let totalCohesionForce = createVector()

        flock.forEach(other => {

            if (other != this) 
            {
                let distance = (this.position.x - other.position.x) ** 2 + (this.position.y - other.position.y) ** 2

                if(distance > 0 && distance < sightRadius ** 2) {
                    if(distance < (sightRadius / 4) ** 2) {
                        totalSeparationForce.add(Vector.sub(this.position, other.position).normalize().div(distance))
                    }
                    totalAlignForce.add(other.velocity)
                    totalCohesionForce.add(other.position)
                    close++
                }
            }
        })

        if(close > 0) {
            totalSeparationForce.div(close).setMag(this.maxSpeed)
            totalAlignForce.div(close).setMag(this.maxSpeed)
            totalCohesionForce.div(close)
            let separationSteer = Vector.sub(totalSeparationForce, this.velocity).limit(this.maxForce)
            let alignSteer = Vector.sub(totalAlignForce, this.velocity).limit(this.maxForce)
            let cohesionSteer = this.seek(totalCohesionForce)
            return [separationSteer, alignSteer, cohesionSteer]
        }
        
        return [createVector(), createVector(), createVector()]
    }

    applyForce(force) {
        this.acceleration.add(force)
    }

    update(delta) {
        //handle movement
        this.position.add(this.velocity)
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.maxSpeed)
        this.acceleration.mult(0)

        this.loop()
    }

    loop() {
        if (this.position.x > window.innerWidth) {
            this.position.x = 0
        } else if (this.position.x < 0) {
            this.position.x = window.innerWidth
        }

        if (this.position.y > window.innerHeight) {
            this.position.y = 0
        } else if (this.position.y < 0) {
            this.position.y = window.innerHeight
        }
    }
    
    draw() {
        if(showSight && this.debug) { 
            this.drawSight()
        }
        
        let theta = this.velocity.heading() + Math.PI / 2
        
        this.sprite.rotation = theta
        this.sprite.position.set(this.position.x, this.position.y)
    }

    drawSprite() {
        let triangle = new PIXI.Graphics()
        triangle.beginFill(0x000000)
        triangle.lineStyle(2, 0xFFFFFF, 1)
        
        triangle.drawPolygon([
            0, -this.size * 2,
            -this.size, this.size * 2,
            this.size, this.size * 2
        ])
        triangle.endFill()
        app.stage.addChild(triangle)
        return triangle
    }
    drawSight() {
        push()
        stroke(255)
        noFill()
        circle(this.position.x, this.position.y, sightForce * 2)
        pop()
    }
}