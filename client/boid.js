class Boid {
	constructor(debug) {
        this.position = createVector(random(windowWidth), random(windowHeight))
        this.velocity = createVector()
        this.acceleration = createVector()
        this.size = 3
        this.maxSpeed = 10
        this.maxForce = 0.1
        this.debug = debug
    }

    think(targets, flock) {

        let seekForce = createVector()
        targets.forEach(target => {
            seekForce.add(this.seek(p5.Vector.mult(target.position, windowVec)))
        })

        let [separationForce, alignForce, cohesionForce] = this.calculateForces(flock)

        seekForce.mult(seekSlider.value())
        separationForce.mult(separationSlider.value())
        alignForce.mult(alignSlider.value())
        cohesionForce.mult(cohesionSlider.value())

        this.applyForce(seekForce)
        this.applyForce(separationForce)
        this.applyForce(alignForce)
        this.applyForce(cohesionForce)
    }

    seek(target) {
        let desired = p5.Vector.sub(target, this.position)
        desired.limit(this.maxSpeed)
        let steer = p5.Vector.sub(desired, this.velocity)
        steer.limit(this.maxForce)
        return steer
    }

    calculateForces(flock) {
        let close = 0
        let totalSeparationForce = createVector()
        let totalAlignForce = createVector()
        let totalCohesionForce = createVector()

        flock.forEach(other => {

            let distance = (this.position.x - other.position.x) ** 2 + (this.position.y - other.position.y) ** 2

            if(distance > 0 && distance < sightSlider.value() ** 2) {
                totalSeparationForce.add(p5.Vector.sub(this.position, other.position).normalize().div(distance))
                totalAlignForce.add(other.velocity)
                totalCohesionForce.add(other.position)
                close++
            }
        })

        if(close > 0) {
            totalSeparationForce.div(close).setMag(this.maxSpeed)
            totalAlignForce.div(close).setMag(this.maxSpeed)
            totalCohesionForce.div(close)
            let separationSteer = p5.Vector.sub(totalSeparationForce, this.velocity).limit(this.maxForce)
            let alignSteer = p5.Vector.sub(totalAlignForce, this.velocity).limit(this.maxForce)
            let cohesionSteer = this.seek(totalCohesionForce)
            return [separationSteer, alignSteer, cohesionSteer]
        }
        return [createVector(), createVector(), createVector()]
    }

    applyForce(force) {
        this.acceleration.add(force)
    }

    update() {
        //handle movement
        this.position.add(this.velocity)
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.maxSpeed)
        this.acceleration.mult(0)

        this.loop()
    }

    loop() {
        if (this.position.x > width) {
            this.position.x = 0
        } else if (this.position.x < 0) {
            this.position.x = width
        }

        if (this.position.y > height) {
            this.position.y = 0
        } else if (this.position.y < 0) {
            this.position.y = height
        }
    }
    
    draw() {
        let theta = this.velocity.heading() + PI / 2
        push()
        strokeWeight(2);
        stroke(255);
        fill(0);
        translate(this.position.x, this.position.y)
        rotate(theta)
        beginShape()
        vertex(0, -this.size * 2)
        vertex(-this.size, this.size * 2)
        vertex(this.size, this.size * 2)
        endShape(CLOSE)
        pop()
        if(showSight && this.debug) { 
            this.drawSight()
        }
    }

    drawSight() {
        push()
        stroke(255)
        noFill()
        circle(this.position.x, this.position.y, sightSlider.value() * 2)
        pop()
    }
}