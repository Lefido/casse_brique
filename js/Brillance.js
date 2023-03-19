
export class Brillance {
    constructor(game, brique) {
        this.game = game
        this.brique = brique
        this.x = this.brique.x - 4
        this.y = this.brique.y - 4
        this.width = this.brique.width + 8
        this.height = this.brique.height + 8
        this.markedDeletion = false

    }

    update() {

        let vitesse = 2

        this.x += vitesse
        this.width -= vitesse * 2
        this.y += vitesse
        this.height -= vitesse * 2
      

        if (this.width < 0 || this.height < 0) {
            this.markedDeletion = true
        }

    }

    draw(ctx) {

        ctx.save()
        ctx.beginPath()
        ctx.fillStyle = "yellow"
        // ctx.lineWidth = 4;
       
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.globalAlpha = 0.5
        ctx.fill()
        ctx.closePath()
        ctx.restore()

    }

   

}
