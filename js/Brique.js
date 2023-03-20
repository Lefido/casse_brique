
export class Brique {
    constructor(game, x, y, width, height) {

        this.briqueDetail = [
            {col: "blue", life: 1 }, {col: "green", life: 1 },
            {col: "yellow", life: 2 }, {col: "red", life: 2 },
            {col: "orange", life: 3 }, {col: "gray", life: 3 },
            {col: "purple", life: 4 }, {col: "Lime", life: 4 },
            {col: "LightSeaGreen", life: 5 }, {col: "LightSteelBlue", life: 5 },
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
        this.sndTouche = new Audio('./sounds/brique_touche.mp3')
        this.sndCasse = new Audio('./sounds/brique_casse.mp3')

        let numBrique = Math.round(Math.random() * (this.briqueDetail.length - 1))
        // console.log(
        //     numBrique,
        //     this.briqueDetail[numBrique].col
        //     )

        this.color =  this.briqueDetail[numBrique].col // `rgb(${r}, ${g}, ${b})`
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

        // ctx.strokeStyle = this.color
        // ctx.fillStyle = this.color
        
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.font = '15px serif';
        ctx.textAlign = 'center'
        ctx.fillStyle = "black"
        ctx.fillText(this.life + "/" + this.lifeMAx, this.x + this.width * 0.5 + 1 , this.y + this.height * 0.7 + 1)
        ctx.closePath()

        ctx.beginPath()
        ctx.font = '15px serif';
        ctx.textAlign = 'center'
        ctx.fillStyle = "white"
        ctx.fillText(this.life + "/" + this.lifeMAx, this.x + this.width * 0.5 , this.y + this.height * 0.7)
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

    briqueTouche() {
        this.sndTouche.play()
    }

    briqueCasse() {
        this.sndCasse.play()
    }

}