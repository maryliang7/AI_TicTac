const PLAYER = {
  'human': 'X',
  'ai': 'O'
}

class Game {
  constructor() {
    this.player = PLAYER.human;
    this.start()
  }

  start() {
    this.gameState = true
    this.board = ['','','','','','','','',''];
    this.boxes = document.querySelectorAll('.box')
    this.boxes.forEach(box => {
      box.innerHTML = ''
      box.addEventListener('click', this.checkClick.bind(this))
    })
  }

  checkClick(box) {
    if (this.player === PLAYER.ai || this.board[box.target.id] !== '' || !this.gameState) {
      return
    }
    
    this.board[box.target.id] = this.player;
    this.boxes[box.target.id].innerHTML = this.player;

    let gameStatus = this.checkGame(this.board, this.player);

    if (gameStatus){
      this.gameOver(gameStatus)
    } else if (this.availSpots().length) {
      this.player = PLAYER.ai;
      this.compTurn();
    } else if (!this.availSpots.length) {
      this.gameOver([])
    }
  }

  availSpots(board = this.board) {
    return board.map((x, idx) => x === '' ? idx : 'no').filter(y => y != 'no');
  }

  gameOver(combo) {
    this.gameState = false;
    console.log(combo)
    combo.forEach(idx => {
      this.boxes[idx].style.color = "maroon"
    })
    if (!combo.length) {
      this.displayMessage("It's a tie!", combo)
    } else if (this.player === PLAYER.human) {
      this.displayMessage("You win!!", combo)
    } else {
      this.displayMessage("You lose :(", combo)
    }
  }

  displayMessage(msg, combo) {
    let endScreen = document.getElementById('game-over')
    endScreen.classList.remove('hidden');
    document.getElementById('message').innerHTML = msg;
    document.getElementById('restart').addEventListener('click', ()=> {
      endScreen.classList.add('hidden');
      this.player = PLAYER.human;
      this.start()
      combo.forEach(idx => {
        this.boxes[idx].style.color = "white"
      })
    })
  }



  checkGame(board, sym) {
    let winCombo = this.checkRow(board, sym)

    if (!winCombo) {
      winCombo = this.checkColumn(board, sym);
    }

    if (!winCombo) {
      winCombo = this.checkDiag(board, sym);
    }

    return winCombo;
  }

  checkRow(board, sym) {
    for (let i = 0; i < board.length; i+= 3) {
      if ([board[i], board[i + 1], board[i + 2]].every(x => x === sym)) {
        return [i, i + 1, i + 2]
      }
    }
    return false;
  }

  checkColumn(board, sym) {
    for (let i = 0; i < 3; i++) {
      if ([board[i], board[i + 3], board[i + 6]].every(x => x === sym)) {
        return [i, i + 3, i + 6]
      }
    }
    return false;
  }

  checkDiag(board, sym) {
    if ([board[0], board[4], board[8]].every(x => x === sym)) {
      return [0, 4, 8]
    } else if ([board[2], board[4], board[6]].every(x => x === sym)) {
      return [2, 4, 6]
    }
    return false;
  }



  compTurn() {

    let best = this.findBestMove(this.board, this.player).index

    this.board[best] = this.player;
    this.boxes[best].innerHTML = this.player;
    let gameStatus = this.checkGame(this.board, this.player)

    if (gameStatus) {
      this.gameOver(gameStatus)
    } else if (this.availSpots().length) {
      this.player = PLAYER.human;
    } else if (!this.availSpots.length) {
      this.gameOver([])
    }
  }

  findBestMove(board, player) {
    let eSpots = this.availSpots(board)

    if (this.checkGame(board, PLAYER.human)) {
      return {score: -1};
    } else if (this.checkGame(board, PLAYER.ai)) {
      return {score: 1};
    } else if (eSpots.length === 0) {
      return {score: 0};
    }

    let moves = [];

    for(let i = 0; i < eSpots.length; i++) {
      let move = {};
      let newBoard = board.slice(0);
      newBoard[eSpots[i]] = player;
      move.index = eSpots[i];

      if (player === PLAYER.ai) {
        move.score = this.findBestMove(newBoard, PLAYER.human).score
      } else {
        move.score = this.findBestMove(newBoard, PLAYER.ai).score
      }

      moves.push(move)
    }

    let bestScore, bestMove;

    if (player === PLAYER.ai) {
      bestScore = -10;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = moves[i];
        }
        
      }
    } else {
      bestScore = 10;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = moves[i];
        }
      }
    }
    return bestMove;
  }






}

new Game()
