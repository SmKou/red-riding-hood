const getState = ({ width, height }) => ({ 
    width, 
    height, 
    third: Math.floor(height / 3),
    fourth: Math.floor(height / 4)
})

export default function render(app) {
    const { ctx } = app
    const { width, height, third, fourth } = getState(app)

    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, width, third)
    ctx.fillRect(0, 3 * fourth, width, height - 3 * fourth)
    
    return requestAnimationFrame(render(app))
}