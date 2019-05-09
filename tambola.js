let q = document.querySelector.bind(document)

// Initialize a random board
let seq = _.sortBy(_.range(0, 10 * 9), Math.random)
let tmpl = _.template(q('.template').innerHTML)
q('.board').innerHTML = tmpl({seq: seq})

// next() shows the next number
let $number = q('.number')
let $numberval = q('.number .value')
let index = 0
let fade
let next = () => {
  if (index >= seq.length) {
    $numberval.innerHTML = '-'
  } else {
    $numberval.innerHTML = seq[index] + 1
    q('.cell-' + seq[index]).classList.add('marked')
    index++
  }
  $number.classList.add('fadein')
  if (fade)
    fade = clearTimeout(fade)
  fade = setTimeout(() => $number.classList.remove('fadein'), 2000)
}

// "Show" button shows all marked cells. "Hide" button hides them
let show_all = () => q('.board').classList.add('open')
let hide_all = () => q('.board').classList.remove('open')
q('.show').addEventListener('click', show_all, false)
q('.hide').addEventListener('click', hide_all, false)
q('.next').addEventListener('click', next, false)

// Handle keyboard events to do the same
q('body').addEventListener('keypress', (e) => {
  if (e.target.contentEditable == 'true') return
  else if (e.key == 's') show_all()
  else if (e.key == 'h') hide_all()
  else if (e.key == 'n' || e.key == ' ') next()
})

window.addEventListener('beforeunload', (e) => {
  e.preventDefault()
  e.returnValue = ''
})
