
import { Brique } from "./Brique.js"
import { Balle } from "./Balle.js"
import { Explosion } from "./Explosion.js"
import { Palette } from "./Palette.js"
import { SndBalleMur, SndBallePalette, SndBriqueCasse, SndBriqueImpact, SndballOut } from "./Sound.js"
import { tableaux } from "./Tableau.js"

export class Game {

    constructor(width, height) {
        this.listBg = document.querySelectorAll('.bg')
        let rnd = Math.floor(Math.random() * this.listBg.length)
        this.bg = this.listBg[rnd]

        this.music = new Audio('./sounds/cyber-attack.mp3')
        this.music.loop = true
        // this.playMusic()
        this.width = width
        this.height = height
        this.player = new Palette(this)
        this.balles = []
        this.briques = []
        this.explosions = []
        this.sounds = []
        this.addBrique()
       
    }

    update() {

        // Update Brique 
        this.briques.forEach(brique => brique.update())
        // Update Ball
        this.balles.forEach(balle => {
            balle.update()
            this.briques.forEach(brique => {
                // Check collision Balle, Brique
                 if (this.checkCollisionBrique(balle, brique)) {
                    this.addSndBriqueImpact()
                    brique.addImpact()
                    if (brique.markedDeletion) {
                        this.addSndBriqueCasse()
                        this.addExplosion(brique.x  + brique.width * 0.5, brique.y + brique.height * 0.5, brique)
                    } 
                 }
            })
            
        })

        // Delete ball dead
        this.balles = this.balles.filter(balle => !balle.markedDeletion)
        // Delete brique dead
        this.briques = this.briques.filter(brique => !brique.markedDeletion)
        // Update Explosion
        this.explosions.forEach(explosion => explosion.update())
        this.explosions = this.explosions.filter(explosion => !explosion.markedForDeletion)
        // Check collision balle, Player
        this.balles.forEach(balle => {

            if (this.checkCollisionPlayer(balle, this.player)) {
                this.addSndBallePalette()
            }
        })
       
        // Lecture des sons
        this.sounds.forEach(sound => {
            sound.lecture()
        })
        this.sounds = this.sounds.filter(sound => !sound.markedDeletion)

        // Remplissage des briques
        if (this.briques.length === 0) {
            this.changeBackGround()
            setTimeout(this.addBrique(), 5000)
            
            // this.balles = []
            if (this.briques.length != 0 ) {
                this.addBalle(this.player.x + this.player.width * 0.5, this.player.y)

            }


        }

    }

    draw(ctx) {
        // Draw Bg
        ctx.drawImage(this.bg, 0,0, this.width, this.height)
        // Draw Briques
        this.briques.forEach(brique => brique.draw(ctx))
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
        let nbY = 11
        let width = this.width / nbX
        let height = (this.height/ 2) / nbY
        let numBrique = 0

        for (let y = 1; y < nbY + 1; y++) {
            for (let x = 0; x < nbX; x++) {

                // console.log(this.tableaux[this.numTableau][numBrique])
                let valBrique = this.tableaux[this.numTableau][numBrique]
                if (valBrique != 0) {
                    this.briques.push(new Brique(this, x * width + 2, y * height + 2, width - 4 , height - 4, valBrique-1))
                }
               
                numBrique++
            }
        }

        this.numTableau++
        if (this.numTableau > this.tableaux.length) this.numTableau = 0

        console.log("Prochain Tableau",this.numTableau)

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
                    balle.vx -= 2
                    balle.y = this.player.y - marge
                }

                if (balle.x >= this.player.x + this.player.width * 0.34 && balle.x <= this.player.x + this.player.width * 0.65)  {
                    balle.vx -= balle.vx / 2 
                    balle.y = this.player.y - marge
                }

                if (balle.x >= this.player.x + this.player.width * 0.67 && balle.x <= this.player.x + this.player.width)  {
                    balle.vx += 2
                    balle.y = this.player.y - marge
                }
            
                balle.vy *= -1
                return true

        } else  return false
       

    }

    playMusic() {
        this.music.play()
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

    addSndBallOut() {
        this.sounds.push(new SndballOut())
    }

    changeBackGround() {
        let rnd = Math.floor(Math.random() * this.listBg.length)
        this.bg = this.listBg[rnd]
    }
                         
}
