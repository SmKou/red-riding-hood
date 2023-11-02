import './style.css'
import createContext from './rendering/Context'
import render from './rendering/Render'

function exec() {
    const opt = '2d'

    let app, draw, timeout;

    return {
        load: function() {
            if (draw)
                cancelAnimationFrame(draw)

            const cvs = document.getElementById('app')
            cvs.width = window.innerWidth
            cvs.height = window.innerHeight

            app = createContext(cvs, opt)
            draw = render(app)
        },
        resize: function() {
            if (!timeout)
                clearTimeout(timeout)

            timeout = setTimeout(() => this.load(), 400)
        }
    }
}

const executable = exec()
executable.load()

window.onresize = () => executable.resize()