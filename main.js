import './style.css'
import init from './rendering/Context.js'

const setApp = () => {
    const cvs = document.getElementById('app')
    cvs.width = window.innerWidth
    cvs.height = window.innerHeight
    const { ctx } = init(cvs, '2d')
    return { cvs, ctx }
}

const draw = (app) => {
    const width = app.cvs.width
    const height = app.cvs.height
    const thirdHeight = Math.floor(height / 4)

    app.ctx.fillStyle = '#000'
    app.ctx.fillRect(0, 0, width, thirdHeight)
    app.ctx.fillRect(0, 3 * thirdHeight, width, height - 3 * thirdHeight)
    
    app.frames = requestAnimationFrame(draw)
}

let timeout = ''

let app = setApp()
draw(app)

window.onresize = () => {
    if (!timeout)
        clearTimeout(timeout)
    timeout = setTimeout(() => {
        app = setApp()
        draw(app)
    }, 400)
}