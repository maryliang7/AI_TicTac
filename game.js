const pX = 'X';
const pO = 'O';

const PLAYER = {
  'human': 0,
  'ai': 1
}



class Game {
  constructor() {
    this.board = ['','','','','','','','','']
    this.player = PLAYER.human;
    this.start()
  }

  start() {
    this.boxes = document.querySelector('.box')
    this.boxes.forEach(box => {
      box.addEventListener('click', this.checkClick)
    })
  }

  checkClick() {
    
  }

  







}

new Game()
