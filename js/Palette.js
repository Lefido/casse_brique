
export class Palette {
    constructor(game) {
        
        this.game = game
        this.width = this.game.width * 0.18
        this.height = this.game.height * 0.03
        this.x = (this.game.width / 2) - this.width * 0.5
        this.y = this.game.height - this.height - this.game.height * 0.02
        let palette = document.querySelectorAll('.palettes')
        let rnd = Math.floor(Math.random() * palette.length)
        this.image = palette[rnd]

    }

    update(x) {
        this.x = x - this.width * 0.5

    }

    draw(ctx) {

        ctx.beginPath()
        ctx.fillStyle = "white";
        ctx.strokeStyle = "gray"
        ctx.lineWidth = 2
        // ctx.rect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()

    }
}