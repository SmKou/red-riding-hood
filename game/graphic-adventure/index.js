const divide = (dimension, divisor) => Math.floor(dimension / divisor)

const getDimensions = ({ width, height }) => ({
    width,
    mid_width_tile: divide(width, 12),
    height,
    top_height_tile: divide(height / 3, 3),
    mid_height_tile: divide((height - height / 3 - height / 4), 6),
    top: divide(height, 3),
    bottom: divide(height, 4)
})

const render = (screen) => {
    const { 
        ctx, 
        width, 
        mid_width_tile: mid_width, 
        height, 
        top_height_tile: top_height, 
        mid_height_tile: mid_height, 
        top, 
        bottom
    } = screen

    const reframe = () => {
        ctx.fillStyle = '#000'
        ctx.fillRect(0, 0, width, top)
        ctx.fillRect(0, 3 * bottom, width, height - 3 * bottom)

        // Little Red
        const left_corner = 2 * mid_width
        const bottom_corner = top + 2 * mid_height
        ctx.fillStyle = '#f00'
        ctx.beginPath()
        ctx.moveTo(left_corner, bottom_corner)
        ctx.lineTo(left_corner + mid_width / 2, bottom_corner - mid_width)
        ctx.lineTo(left_corner + mid_width, bottom_corner)
        ctx.closePath()
        ctx.fill()

        // Door
        const door_top = top_height
        const door_left = 9 * mid_width
        ctx.fillStyle = '#aa0'
        ctx.fillRect(door_left, door_top, 2 * mid_width, 2 * top_height)

        // Portraits
        const first_portrait_top = top_height
        const first_protrait_left = 2 * mid_width
        ctx.fillStyle = '#fff'
        ctx.fillRect(first_protrait_left, first_portrait_top, mid_width, top_height)
    }

    return reframe
}

const graphicAdventure = { getDimensions, render }
export default graphicAdventure