import './styles.css'

let ctx, screen, player, running, isRunning = true, timeout

const move = params => player.move.push({ 
    dx: params.dx * screen.tile, 
    dy: params.dy * screen.tile
})

const load = () => {
    const cvs = document.getElementById('app')
    cvs.width = cvs.offsetWidth * 2
    cvs.height = cvs.offsetHeight * 2

    if (!cvs.getContext)
        throw new Error('Browser does not support rendering')

    ctx = cvs.getContext('2d')

    screen = {
        width: cvs.width,
        height: cvs.height,
        block: 36,
        tile: 36 / 2
    }

    player = {
        pos: {
            x: screen.width / 2,
            y: screen.height / 2
        },
        move: []
    }
}

const render = ({ block, tile } = screen) => {
    ctx.reset()

    ctx.fillStyle = '#f00'
    ctx.beginPath()
    ctx.moveTo(player.pos.x, player.pos.y - tile)
    ctx.lineTo(player.pos.x + tile, player.pos.y + tile)
    ctx.lineTo(player.pos.x - tile, player.pos.y + tile)
    ctx.closePath()
    ctx.fill()

    if (player.move.length) {
        const { dx, dy } = player.move.shift()
        player.pos.x += dx
        player.pos.y += dy
    }
}

const draw = () => {
    render()
    if (isRunning)
        requestAnimationFrame(draw)
}

const pause = () => {
    isRunning = false
    cancelAnimationFrame(running)
}

const run = () => running = requestAnimationFrame(draw)

const resize = () => {
    if (!timeout)
        clearTimeout(timeout)
    timeout = setTimeout(() => run(), 400)
}

load()
run()

document.addEventListener('pointerdown', e => {})
document.addEventListener('pointerup', e => {})
document.addEventListener('keydown', e => {})
document.addEventListener('keyup', e => {})

window.onresize = () => resize()