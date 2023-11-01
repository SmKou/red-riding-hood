
export default function init(cvs, opt) {
    if (!cvs.getContext)
        return null

    let mode = ''
    const get = (m) => {
        mode = (m !== '2d' ? 'web' : '') + m
        return cvs.getContext(mode)
    }

    if (opt)
        return { mode: opt, ctx: get(opt) }

    const gpu = () => get('gpu')
    const gl = () => get('gl')
    const d2 = () => get('2d')

    const ctx = navigator.gpu ?
        gpu(cvs)
        : gl(cvs) === null ?
            gl(cvs)
            : d2(cvs)
    
    return { mode, ctx }
}