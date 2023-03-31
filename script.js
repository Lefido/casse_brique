
import { Game } from "./js/Game.js"
import { Balle } from "./js/Balle.js"

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')


canvas.width = 600 //window.innerWidth
canvas.height = 700 // window.innerHeight

const game = new Game(canvas.width, canvas.height)


let canvasPosition = canvas.getBoundingClientRect()

window.addEventListener('load', ()=> {

    window.addEventListener('resize', () => {
        canvas.width = 600 //window.innerWidth
        canvas.height = 700 //window.innerHeight
        game.width = canvas.width
        game.height = canvas.height
       
    })
    
    window.addEventListener('mousedown', (e) => {
    
        let nbBall = 1
        for (let i=0; i<nbBall; i++){
            game.addBalle(e.x - canvasPosition.left, game.player.y - 10)
        }
        
    })
    
    window.addEventListener('mousemove', (e)=> {

        let mX = e.x - canvasPosition.left

        if (mX <= 0) mX = 0
        if (mX >= game.width) mX = game.width
        
        game.player.update(mX)
    })

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

