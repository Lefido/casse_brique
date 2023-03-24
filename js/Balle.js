
export class Balle {
    constructor(game, x = game.width /2, y = game.height / 8) {

        this.game = game
        this.x = x
        this.y = y
        this.speedValide = true
   
        this.size = Math.random() * 5 + 5
        this.vx = Math.random() * 15 - 7.5
        this.vy = Math.random() * 20 - 10
                
        this.minSpeed = 8

        while(this.speedValide) {

            this.vx = Math.random() * 15 - 7.5
            this.vy = Math.random() * 20 - 10

            if (this.vx < - this.minSpeed || this.vx > this.minSpeed && 
                this.vy < - this.minSpeed || this.vy > this.minSpeed ) {
                this.speedValide = false
            }
            
        }

        this.markedDeletion = false
    }

    update() {
       
        this.x += this.vx
        this.y += this.vy

        if (this.x + this.size >= this.game.width || this.x < this.size) {
            if (this.x + this.size > this.game.width) this.x = this.game.width - this.size
            else this.x = this.size
            this.vx *= -1
            this.game.addSndBalleMur()
            
        }

        if (this.y < 0 + this.size) {

            if (this.y > this.size) this.y = this.game.height - this.size
            else this.y = this.size
            this.vy *= -1
            this.game.addSndBalleMur()
        }

        if (this.y > this.game.height) {
            this.markedDeletion = true
            this.game.addSndBallOut()
        }

    }

    draw(ctx) {

        ctx.beginPath()
        ctx.fillStyle = "white"
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()

        ctx.beginPath()
        ctx.strokeStyle = "yellow"
        ctx.lineWidth = this.size * 0.5
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.stroke()
        ctx.closePath()

    }


}