const dino = document.querySelector('.dino')
const background = document.querySelector('.background')
let scoreValue = document.querySelector('.score')
let score = 0
let maxScore =0
let isJumping = false
let position = 0
let backgroundSound = new Audio('./sounds/trilhaJogo.mp3')
let jumpSound = new Audio('./sounds/somPulo.mp3')
let gamerOver = new Audio('./sounds/gameOver.mp3')

let scoreCount = () => {
  if (score < 999999) {
    score += 1
    scoreValue.innerHTML = `Pontos: ${score}`
  }
  setTimeout(scoreCount, 100)
}

function handleKeyDown(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      backgroundSound.play()
      backgroundSound.loop = true
      jump()
      jumpSound.play()
    }
  }
}

function jump() {
  isJumping = true
  let upInterval = setInterval(() => {
    if (position >= 200) {
      clearInterval(upInterval)

      // Descendo
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval)
          isJumping = false
        } else {
          position -= 30
          dino.style.bottom = `${position}px`
        }
      }, 20)
    } else {
      // Subindo
      position += 30
      dino.style.bottom = `${position}px`
    }
  }, 20)
}

function createCactus() {
  const cactus = document.createElement('div')
  let cactusPosition = 1000
  let randomTime = Math.floor(Math.random() * 6000)

  cactus.classList.add('cactus')
  cactus.style.left = `${cactusPosition}px`
  background.appendChild(cactus)

  let leftInterval = setInterval(() => {
    if (cactusPosition <= -60) {
      clearInterval(leftInterval)
      background.removeChild(cactus)
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Gamer Over
      clearInterval(leftInterval)
      maxScore = score > maxScore ? score : maxScore
      document.body.innerHTML = `<h1 class="game-over">Fim de Jogo</h1><br><h2>Pontos: ${maxScore}</h2>` 
      scoreCount = ''
      jumpSound = new Audio('')
      backgroundSound.pause()
      backgroundSound = new Audio('')
      gamerOver.play()
      gamerOver = new Audio('')
    }
    else {
      cactusPosition -= 10
      cactus.style.left = `${cactusPosition}px`
    }
  }, 20)

  setTimeout(createCactus, randomTime)
}

scoreCount()
createCactus()


document.addEventListener('keydown', handleKeyDown)