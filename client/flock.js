class Flock {
    constructor(size) {
        this.flock = []

        for (let i = 0; i < size; i++) {
            this.flock.push(new Boid(i < size * 0.1));
        }
    }

    remove(amount) {
        if(this.flock.length <= POP_SIZE * 0.1) {
            return
        }
        for(let i = 0; i < amount; i++) {
            this.flock.pop()
        }
    }

    add() {
        this.flock.push(new Boid(false, p5.Vector.add(this.flock[Math.floor(Math.random() * this.flock.length)].position, createVector())))
    }
}