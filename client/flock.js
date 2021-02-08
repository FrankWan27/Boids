class Flock {
    constructor(size) {
        this.flock = []

        for (let i = 0; i < size; i++) {
            this.flock.push(new Boid(i < size * 0.1));
        }
    }

    remove(amount) {
        for(let i = 0; i < amount; i++) {
            this.flock.pop()
        }
    }

    add() {
        this.flock.push(new Boid(false, p5.Vector.add(this.flock[Math.floor(Math.random() * this.flock.length)].position, createVector())))
    }
}