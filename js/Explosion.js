
export class Explosion {

   

    constructor(game, x, y, brique) {
        this.game = game
        
        this.size = Math.random() * 20 + 2

        this.x = x //- this.size / 2 
        this.y = y // - this.size / 2
        this.markedForDeletion = false
        this.eX1 = brique.width * 0.08
        this.eX2 = this.eX1 / 2
        this.eY1 = brique.height * 0.5
        this.eY2 = this.eY1 / 2
        this.vx = Math.random() * this.eX1 - this.eX2
        this.vy =  Math.random() * this.eY1 - this.eY2
        this.gy = 0.1
        this.numColor = 0 // Math.round(Math.random() * 100) 
        this.colorTransparence = 1
        // this.color ="hsl("+ this.numColor +",80%, 50%, 1"
        this.color = brique.color
        this.bound = false
        this.nbBound = 0
        this.angle = 0
        this.va = Math.random() * 1 - 0.5
        
    }

    update() {

        this.x += this.vx

        this.vy +=  this.gy 
        this.y += this.vy

        this.size = this.size - 0.4
        
        this.numColor +=10

        this.colorTransparence -= 0.1

        if (this.y >= this.game.height && this.bound) {
            // this.y = this.game.height - this.size
            this.vy *= - 0.9
            this.va = - this.va
            this.nbBound++
            if (this.nbBound >= 1 ) this.bound = !this.bound
        }

        // if (this.x > this.game.width - this.size || this.x  < this.size) {
        //     this.vx *= -1
        // }

        if (this.size < 0) {
            this.markedForDeletion = true
        }

        this.angle += this.va

    }
    
    draw(ctx) {

       
        ctx.save()

        

        ctx.beginPath()

        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)

        ctx.fillStyle = this.color
        ctx.strokeStyle = "white"
        ctx.globalAlpha = (1 * this.size / 100) * 6
        ctx.rect(0 - this.size / 2, 0 - this.size / 2, this.size, this.size)
        ctx.stroke()
        ctx.fill()
        ctx.closePath()

        ctx.restore()

    }

}