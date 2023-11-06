import './style.css'

const app = {
    mode: '',
    ctx: null,
    screen: {},
    player: {},
    running: '',
    timeout: '',
    isRunning: false,
    isMobile: false,
    isDevotedWorkerEnabled: false,
    isSharedWorkerEnabled: false,
    isStorageEnabled: false,
    viewPrompt: true,
    viewText: true,
    viewControls: true,
    useRightDir: true,
    useUppercase: false,
    ui: {
        toggle: {
            view: document.getElementById('toggle-view'),
            prompt: document.getElementById('toggle-prompt'),
            text: document.getElementById('toggle-text'),
            controls: document.getElementById('toggle-controls'),
            dir: document.getElementById('toggle-direction'),
            charcase: document.getElementById('toggle-case')
        },
        elem: {
            splash: document.getElementById('splash-screen'),
            view: document.getElementById('view'),
            canvas: document.getElementById('app'),
            menu: document.getElementById('menu'),
            prompt: document.getElementById('prompt'),
            keyboard: document.getElementById('keyboard'),
            text: document.getElementById('text'),
            controls: document.getElementById('controls')
        },
        ctrl: {
            up: document.getElementById('up'),
            left: document.getElementById('left'),
            right: document.getElementById('right'),
            down: document.getElementById('down'),
            start: document.getElementById('open-menu'),
            confirm: document.getElementById('confirm'),
            cancel: document.getElementById('cancel')
        }
    },
    step: {
        start: '',
        prevTimestamp: '',
        done: false
    },
    storage: ''
}

/*  Load:
    render - webgpu | webgl | 2d
    physics - web worker | no web worker
*/
const scripts = {}

/*  Note:
    View = visible portion of app
    App = loaded portion of frame
    Frame = moment capture of scene
*/

app.isDevotedWorkerEnabled = Boolean(window.Worker)
app.isSharedWorkerEnabled = Boolean(window.SharedWorker)

// https://medium.com/simplejs/detect-the-users-device-type-with-a-simple-javascript-check-4fc656b735e1
const regex = new RegExp(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i)
app.isMobile = regex.test((navigator.userAgent || navigator.vendor || window.opera).substr(0,4))
if (!app.isMobile) {
    app.viewPrompt = false
    app.ui.elem.prompt.classList.add('collapsed')
}

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
const storageAvailable = type => {
    let storage
    try {
        storage = window[type]
        const x = '__storage_test__'
        storage.setItem(x, x)
        storage.removeItem(x)
        return true
    } catch (e) {
        return e instanceof DOMException 
        && (e.code === 22 || e.code === 1014 || e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') 
        && storage 
        && storage.length !== 0
    }
}
app.isStorageEnabled = storageAvailable('localStorage')
if (app.isStorageEnabled)
    app.storage = window.localStorage

const size = (width, height) => {
    const cvs = app.ui.elem.canvas
    cvs.width = width
    cvs.height = height
}

const context = (opt) => {
    const cvs = app.ui.elem.canvas

    if (!cvs.getContext || !app.storage?.hasCtx)
        throw new Error('Browser does not support rendering')

    if (app.storage.getItem('hasCtx')) {
        app.mode = app.storage.mode
        app.ctx = cvs.getContext(app.storage.mode)
        return;
    }

    const modes = ['webgpu','webgl','2d']
    const getMode = currentMode => modes.includes(currentMode) ? currentMode : ''
    const getCtx = currentMode => {
        if (!currentMode)
            return null
        return cvs.getContext(currentMode)
    }

    let mode = getMode(opt)
    let ctx = mode ? getCtx(mode) : null

    if (ctx === null) {
        let i = 0
        while (ctx === null)
            if((i === 0 && navigator.gpu) || (i !== 0 && getCtx(modes[i]))) {
                mode = modes[i]
                ctx = getCtx(mode)
                continue
            }
    }

    app.mode = mode
    app.ctx = ctx

    if (app.storage) {
        app.storage.hasCtx = true
        app.storage.mode = app.mode
    }
}

const screen = () => ({})

const player = () => ({})

const render = () => {}

const step = timestamp => {
    if (app.step.start === undefined)
        app.step.start = timestamp
    const elapsed = timestamp - app.step.start
    if (app.step.prevTimestamp !== timestamp) {
        // calculate timeframe
    }
    if (elapsed < 2000) {
        app.step.prevTimestamp = timestamp
        if (!app.step.done)
            app.running = requestAnimationFrame(draw)
    }
}

const draw = () => {
    render()
    if (app.isRunning)
        requestAnimationFrame(draw)
}

const run = () => {
    app.isRunning = true
    app.running = requestAnimationFrame(draw)
}

const resize = () => {
    if (app.timeout)
        clearTimeout(timeout)
    timeout = setTimeout(() => {}, 400)
}

document.addEventListener('click', e => {
    const id = e.target.id
    switch (id) {
        case ui.toggle.prompt.id:
            ui.prompt = !ui.prompt
            if (ui.prompt)
                ui.elem.prompt.classList.remove('collapsed')
            else
                ui.elem.prompt.classList.add('collapsed')
            break
        case ui.toggle.text.id:
            ui.text = !ui.text
            const elemAdd = ui.text ? ui.elem.keyboard : ui.elem.text
            const elemRemove = ui.text ? ui.elem.text : ui.elem.keyboard
            elemAdd.classList.add('collapsed')
            elemRemove.classList.remove('collapsed')
            break
        case ui.toggle.controls.id:
            ui.controls = !ui.controls
            if (ui.controls)
                ui.elem.controls.classList.remove('collapsed')
            else
                ui.elem.controls.classList.add('collapsed')
            break
        case ui.toggle.direction.id:
            ui.direction = !ui.direction
            ui.elem.prompt.classList.add(ui.direction ? 'right' : 'left')
            ui.elem.prompt.classList.remove(ui.direction ? 'left' : 'right')
            break
        case ui.toggle.case.id:
            ui.characterCase = !ui.characterCase
            ui.elem.keyboard.classList.add(ui.characterCase ? 'uppercase' : 'lowercase')
            ui.elem.keyboard.classList.remove(ui.characterCase ? 'lowercase' : 'uppercase')
            break
        case ui.
    }
})

document.addEventListener()