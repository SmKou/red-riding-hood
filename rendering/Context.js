const options = ['gpu', 'gl', '2d']
const formalOptions = ['webgpu', 'webgl', '2d']
const last = formalOptions.length - 1

const getMode = (mode) => {
    const currentMode = options.includes(mode) ? 
        formalOptions[options.findIndex(opt => opt === mode)] 
        : formalOptions.includes(mode) ? 
            mode 
            : ''
    return currentMode
}

const getContext = (cvs, mode) => {
    if (!mode)
        return null
    return cvs.getContext(mode)
}

const get = (mode) => getContext(cvs, getMode(mode))

const Context = function(cvs, opt) {
    let mode = getMode(opt)
    let ctx = mode ? getContext(cvs, mode)
        : opt ? getContext(cvs, formalOptions[last])
        : null

    if (ctx === null) {
        let i = 0;
        while (ctx === null && i < options.length) {
            if ((i === 0 && navigator.gpu) || (i !== 0 && get(options[i]))) {
                ctx = get(cvs, options[i])
                mode = getMode(options[i])
                continue
            }
            ++i
        }
    }
    
    return { cvs, mode, ctx }
}

export default function createContext(cvs, opt) {
    if (!cvs.getContext)
        return null

    if (opt)
        return Context(cvs, [opt])

    return Context(cvs)
}