import './style.css'
import init from './rendering/Context.js'

let timeout = ''
let app = {}

const setApp = () => {
    const body = document.querySelector('body')
    const cvs = document.getElementById('app')
    cvs.width = body.clientWidth
    cvs.height = body.clientHeight
    const { ctx } = init(cvs, '2d')
    return { cvs, ctx }
}

const draw = (app) => {
    const thirdHeight = Math.floor(app.cvs.height / 3)

    app.ctx.fillStyle = '#000'
    app.ctx.fillRect(0, 0, app.cvs.width, thirdHeight)
    app.ctx.fillRect(0, 2 * thirdHeight, app.cvs.width, app.cvs.height - 2 * thirdHeight)
    
    app.frames = requestAnimationFrame(draw)
}

app = setApp()
draw(app)


window.onresize = () => {
    if (!timeout)
        clearTimeout(timeout)
    timeout = setTimeout(() => {
        app = setApp()
        draw(app)
    }, 400)
}