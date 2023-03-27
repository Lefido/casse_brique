
export class Brique {
    constructor(game, x, y, width, height) {

        this.briqueDetail = [
            {col: "blue", life: 1 }, {col: "green", life: 2 },
            {col: "gray", life: 3 }, {col: "purple", life: 4 },
            {col: "red", life: 5 }, {col: "yellow", life: 6 },
           ]

        this.game = game
        this.width = width //  Math.random() * 150 + 40
        this.height = height // Math.random() * 10  + 10
        this.x = x // Math.random() * (this.game.width - this.width)
        this.y = y //Math.random() * (this.game.height- this.height)
        this.origineY = this.y
        this.gravity = 0.5
        this.vY = 1
        this.impact = false

        let numBrique = Math.floor(Math.random() * (this.briqueDetail.length))
        let briques = document.querySelectorAll(".brique")
        this.color =  this.briqueDetail[numBrique].col // `rgb(${r}, ${g}, ${b})`
        this.image = briques[numBrique]
        // console.log(briques[numBrique])
        this.life = 0 // this.briqueDetail[numBrique].life
        this.lifeMAx = this.briqueDetail[numBrique].life
        this.markedDeletion = false

    }

    update() {

        this.vY += this.gravity
        this.y += this.vY

        if (this.y > this.origineY) {
            this.y = this.origineY
            this.vY = 0
            this.impact = false
        }

    }

    draw(ctx) {

        ctx.beginPath()
        
        if (this.impact) {
            let color = "rgb(155, 155, 155)"
            // ctx.globalAlpha = 0.8
            ctx.strokeStyle = "rgb(220, 220, 220)"
            ctx.fillStyle = this.color
            ctx.lineWidth = 3;
        } else {
            // ctx.globalAlpha = 1
            ctx.strokeStyle = "white" // this.color
            ctx.fillStyle = this.color
            ctx.lineWidth = 1;
        }

        
        // ctx.rect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        if (!this.impact) {
            ctx.font = "14px serif"
        } else {
            ctx.font = "25px serif"
        }
      
        ctx.fillStyle  ="black"
        ctx.textAlign = "center"
        ctx.fillText(this.lifeMAx - this.life, this.x + this.width * 0.5 + 1, this.y + this.height * 0.7 + 1)
        
        ctx.fillStyle  ="white"
        ctx.textAlign = "center"
        ctx.fillText(this.lifeMAx - this.life, this.x + this.width * 0.5, this.y + this.height * 0.7)
        ctx.closePath()
       
    }

    addImpact() {
        this.life += 1
        if (this.life >= this.lifeMAx) {
            this.markedDeletion = true
        }

        if (!this.impact) {
            this.vY -= 3.5
            this.impact = true
        } 
       
    }

}