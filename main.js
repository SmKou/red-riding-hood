import './style.css'

function context(cvs, opt) {
    if (!cvs.getContext)
        throw new Error("Browser does not support rendering")

    const getMode = (currentMode) => ['webgpu', 'webgl', '2d'].includes(currentMode) ? currentMode : ''
    const getCtx = (mode) => {
        if (!mode)
            return null
        return cvs.getContext(mode)
    }

    let mode = getMode(opt)
    let ctx = mode ? getCtx(mode)
        : opt ? getCtx('2d')
        : null

    if (ctx === null) {
        const options = ['webgpu', 'webgl', '2d']
        let i = 0
        while(ctx === null) 
            if ((i === 0 && navigator.gpu) || (i !== 0 && getCtx(options[i]))) {
                ctx = getCtx(options[i])
                mode = options[i]
                continue
            }
    }

    return { cvs, mode, ctx }
}

function render(dims) {
    const { ctx, width, height, third, fourth } = dims

    const reframe = () => {
        ctx.fillStyle = '#000'
        ctx.fillRect(0, 0, width, third)
        ctx.fillRect(0, 3 * fourth, width, height - 3 * fourth)
    }

    return reframe
}

function init() {
    const opt = '2d'

    let app, dims, draw, running, timeout;

    const load = function() {
        const cvs = document.getElementById('app')
        cvs.width = window.innerWidth
        cvs.height = window.innerHeight

        app = context(cvs, opt)
        dims = { 
            ctx: app.ctx, 
            width: app.cvs.width, 
            height: app.cvs.height, 
            third: Math.floor(app.cvs.height / 3), 
            fourth: Math.floor(app.cvs.height / 4)
        }
        draw = render(dims)
        running = {}
    }

    const run = function() {
        if (running)
            cancelAnimationFrame(running)
        running = requestAnimationFrame(draw)
    }

    const resize = function() {
        if (!timeout)
            clearTimeout(timeout)

        timeout = setTimeout(() => {
            load()
            run()
        }, 400)
    }

    return { load, run, resize }
}

const executable = init()
executable.load()
executable.run()

window.onresize = () => executable.resize()