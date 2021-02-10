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
            app.stage.removeChild(this.flock.pop().sprite)
        }
    }

    add() {
        if(this.flock.length >= POP_SIZE) {
            return
        }

        let vec = this.flock[random(this.flock.length)].position.clone()
        this.flock.push(new Boid(false, vec))
    }
}