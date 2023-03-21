
import { Brique } from "./Brique.js"
import { Balle } from "./Balle.js"
import { Explosion } from "./Explosion.js"
import { Palette } from "./Palette.js"
import { Brillance } from "./Brillance.js"
import { SndBalleMur, SndBallePalette, SndBriqueCasse, SndBriqueImpact, SndHono } from "./Sound.js"

export class Game {

    constructor(width, height) {
        this.bg = document.getElementById('bg_blue')
        this.width = width
        this.height = height
        this.player = new Palette(this)
        this.balles = []
        this.briques = []
        this.explosions = []
        this.brillances = []
        this.sounds = []
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
                 if (this.checkCollisionBrique(balle, brique)) {
                    console.log("Brique Touché")
                    this.addSndBriqueImpact()
                    // this.brillances.push(new Brillance(this, brique))
                    brique.addImpact()
                    if (brique.markedDeletion) {
                        this.addSndBriqueCasse()
                        this.addExplosion(brique.x  + brique.width * 0.5, brique.y + brique.height * 0.5, brique)
                    } 
                 }
            })
            
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

            if (this.checkCollisionPlayer(balle, this.player)) {
                this.addSndBallePalette()
                console.log("Palette touché")
            }
            // if (this.checkCollisionPlayer(balle, this.player)) {
             
            // }
        })
        // Brillance Impact
        this.brillances.forEach(brillance => brillance.update())
        this.brillances = this.brillances.filter(brillance => !brillance.markedDeletion)

        // Lecture des sons
        this.sounds.forEach(sound => {
            sound.lecture()
        })
        this.sounds = this.sounds.filter(sound => !sound.markedDeletion)

        // Remplissage des briques
        if (this.briques.length === 0) {
            this.addBrique()
            // this.balles = []
            this.addBalle(this.player.x + this.player.width * 0.5, this.player.y)
        }

    }

    draw(ctx) {
        // Draw Bg
        ctx.drawImage(this.bg, 0,0, this.width, this.height)
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

        let nbX = 11
        let nbY = 9
        let width = this.width / nbX
        let height = (this.height/ 3) / nbY

        for (let y = 2; y < nbY; y++) {
            for (let x = 0; x < nbX; x++) {
                this.briques.push(new Brique(this, x * width + 2, y * height + 2, width - 4 , height - 4))
            }
        }

    }

    checkCollisionBrique(balle, brique) {

        let marge = balle.size

        let dy1 = balle.y + marge
        let dy2 = balle.y - marge
        let dx1 = balle.x + marge
        let dx2 = balle.x - marge

        if (dy1 >=  brique.y && dy1<= brique.y + brique.height && 
            balle.x >= brique.x && balle.x <= brique.x + brique.width)
            {
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

    checkCollisionPlayer(balle, palette) {

        let marge = balle.size

        let dy1 = balle.y + marge

        if (balle.x >= palette.x && balle.x <= palette.x + palette.width &&
            dy1 >= palette.y && dy1 <= palette.y + palette.height) {

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
                return true

        } else  return false
       

    }

    addSndBriqueImpact() {
        this.sounds.push(new SndBriqueImpact())
    }

    addSndBriqueCasse() {
        this.sounds.push(new SndBriqueCasse())
    }

    addSndBallePalette() {
        this.sounds.push(new SndBallePalette())
    }

    addSndBalleMur() {
        this.sounds.push(new SndBalleMur())
    }

    addSndHoNo() {
        this.sounds.push(new SndHono())
    }
                         
}