
import { Brique } from "./Brique.js"
import { Balle } from "./Balle.js"
import { Explosion } from "./Explosion.js"
import { Palette } from "./Palette.js"
import { Brillance } from "./Brillance.js"

export class Game {

    constructor(width, height) {
        this.width = width
        this.height = height
        this.player = new Palette(this)
        this.balles = []
        this.briques = []
        this.explosions = []
        this.brillances = []
        this.addBrique()
       
        
    }

    update() {

        // Update Brique 

        this.briques.forEach(brique => brique.update())

        // Move Balle
        this.balles.forEach(balle => {
            balle.update()
            this.briques.forEach(brique => {
                // Check collision Balle, Brique
                 if (this.checkCollision(balle, brique)) {
                    console.log("Brique Touché")
                    // this.brillances.push(new Brillance(this, brique))
                    brique.addImpact()
                    if (brique.markedDeletion) {
                        this.addExplosion(brique.x  + brique.width * 0.5, brique.y + brique.height * 0.5, brique)
                    } 
                 }
            })

            this.balles.forEach(balle2 => {
                if (this.checkCollision(balle, balle2)) {
                    console.log("Balle Touche balle")
                }
            } )
            
        })

        // Supprime les balles
        this.balles = this.balles.filter(balle => !balle.markedDeletion)
        // Supprime les brique
        this.briques = this.briques.filter(brique => !brique.markedDeletion)
        // Update balles
        this.balles = this.balles.filter(balle => !balle.dead)
        // Update Explosion
        this.explosions.forEach(explosion => explosion.update())
        this.explosions = this.explosions.filter(explosion => !explosion.markedForDeletion)
        // Check collision balle, Player
        this.balles.forEach(balle => {
            if (this.checkCollision(balle, this.player)) {
                // console.log("Palette Touché")
            }
        })

        this.brillances.forEach(brillance => brillance.update())
        this.brillances = this.brillances.filter(brillance => !brillance.markedDeletion)

        // Remplissage des briques
        if (this.briques.length === 0) this.addBrique()
        

    }

    draw(ctx) {
        // Draw Briques
        this.briques.forEach(brique => brique.draw(ctx))
        // Draw Brillance
        this.brillances.forEach(brillance => brillance.draw(ctx))
        // Draw Explosion
        this.explosions.forEach(explosion => explosion.draw(ctx))
        // Draw Balles
        this.balles.forEach(balle => balle.draw(ctx))
        // Draw Player
        this.player.draw(ctx)

    }

    addExplosion(x, y, color) {

        for (let i=0; i < 50; i++) {
            this.explosions.push(new Explosion(this,x, y, color))
        }
       
       
    }

    addBalle(x,y) {
        this.balles.push(new Balle(this, x, y))
    }

    addBrique() {

        let nbX = 13
        let nbY = 8
        let width = this.width / nbX
        let height = (this.height/ 3) / nbY

        for (let y = 1; y < nbY; y++) {
            for (let x = 1; x < nbX-1; x++) {
                this.briques.push(new Brique(this, x * width + 2, y * height + 2, width - 4 , height - 4))
            }
        }

    }

    checkCollision(balle, brique) {

        let marge = balle.size

        let dy1 = balle.y + marge
        let dy2 = balle.y - marge
        let dx1 = balle.x + marge
        let dx2 = balle.x - marge

        if (dy1 >=  brique.y && dy1<= brique.y + brique.height && 
            balle.x >= brique.x && balle.x <= brique.x + brique.width)
            {

                if (balle.x >= this.player.x + this.player.width * 0 && balle.x <= this.player.x + this.player.width * 0.33)  {
                    console.log('Palette left')
                    balle.vx -= 2
                }
                
                if (balle.x >= this.player.x + this.player.width * 0.34 && balle.x <= this.player.x + this.player.width * 0.65)  {
                    console.log('palette centre')
                    balle.vx -= balle.vx / 2
                }

                if (balle.x >= this.player.x + this.player.width * 0.67 && balle.x <= this.player.x + this.player.width)  {
                    console.log('Palette right')
                    balle.vx += 2
                }

            balle.vy *= -1
            balle.y = brique.y - marge
            return true
        }

        

        if (dy2 >=  brique.y && dy2<= brique.y + brique.height && 
            balle.x >= brique.x && balle.x <= brique.x + brique.width)
            {
            balle.vy *= -1
            balle.y = brique.y + brique.height + marge
            return true
        }

       


        if (dx1 >= brique.x && dx1 <= brique.x + brique.width &&
            balle.y >= brique.y && balle.y <= brique.y + brique.height)
            {
                balle.vx *= -1
                balle.x = brique.x - marge
                return true
            }

       

        if (dx2 >= brique.x && dx2 <= brique.x + brique.width &&
            balle.y >= brique.y && balle.y <= brique.y + brique.height)
            {
                balle.vx *= -1
                balle.x = brique.x + brique.width + marge
                return true
            }


    }

}