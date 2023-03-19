
import { Game } from "./js/Game.js"
import { Balle } from "./js/Balle.js"

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let canvasPosition = canvas.getBoundingClientRect()

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
   
})

window.addEventListener('mousedown', (e) => {

    let nbBall = 1
    for (let i=0; i<nbBall; i++){
        game.addBalle(e.x, game.player.y - 10)
    }
    
})

const game = new Game(canvas.width, canvas.height)

//     canvas.addEventListener('mousemove', (event) => {

//     let x = event.x - canvasPosition.left
//     let y = event.y - canvasPosition.top
//     // let nbExplosion = Math.floor(Math.random() * 100 + 10)
//     let nbExplosion = 20
//     for (let i = 0; i < nbExplosion; i++) {
//         game.addExplosion(x, y)
//     }
   
    
// })

window.addEventListener('mousemove', (e)=> {
    game.player.update(e.x)
})

window.addEventListener('load', ()=> {

    function animate() {

        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0,0,0,8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        game.update()
        game.draw(ctx)

        requestAnimationFrame(animate)
    }

    animate()

})

