import './style.css'

const select = document.querySelector('.select')
const toggle_select = document.querySelector('#toggle-select')
const toggle_arrow = document.querySelector('#toggle-select span')

toggle_select.addEventListener('click', () => {
    const isExpanded = select.classList.contains('expand')
    toggle_arrow.classList.remove(isExpanded ? 'open' : 'closed')
    toggle_arrow.classList.add(isExpanded ? 'closed' : 'open')
    if (isExpanded)
        select.classList.remove('expand')
    else
        select.classList.add('expand')
})

select.addEventListener('mouseleave', () => {
    select.classList.remove('expand')
    toggle_arrow.classList.remove('open')
    toggle_arrow.classList.add('closed')
})

document.getElementById("graphic-btn").addEventListener("click", () => {
	const cvs = document.createElement("canvas")
	const ctx = cvs.getContext("2d")
})

document.getElementById("typed-btn").addEventListener("click", () => {})
