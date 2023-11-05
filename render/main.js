import './styles.css'

const ui = {
    toggle: {
        prompt: document.getElementById('toggle-prompt'),
        text: document.getElementById('toggle-text'),
        controls: document.getElementById('toggle-controls'),
        direction: document.getElementById('toggle-direction'),
        case: document.getElementById('toggle-case')
    },
    elem: {
        prompt: document.getElementById('prompt'),
        keyboard: document.getElementById('keyboard'),
        text: document.getElementById('text'),
        controls: document.getElementById('controls')
    },
    prompt: true, // view prompt
    text: true, // text : keyboard
    controls: true, // view d-pad and btns
    direction: true, // right : left
    characterCase: false    // uppercase : lowercase
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
        default:
            console.log('Not a button')
    }
})