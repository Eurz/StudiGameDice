import Player from './models/Player.js'

export default class Game {
    constructor() {
        this.btnNewGame = document.querySelector('#btn-new-game')
        this.btnRollDice = document.querySelector('#btn-roll-dice')
        this.btnhold = document.querySelector('#btn-hold')

        this.dice = document.querySelector('#dice-container i')
        this.playerOne = new Player('#player-one', 'Player 1')
        this.playerTwo = new Player('#player-two', 'Player 2')

        this.currentPlayer = null

        this.initGame()
    }

    onRollDiceBtn() {
        const randomNumber = Math.floor(Math.random() * 5 + 1)
        this.dice.className = `bi bi-dice-${randomNumber}`

        if (randomNumber > 1) {
            this.currentPlayer.updateCurrentScore(randomNumber)
            return
        }

        this.changePlayer()
    }

    onHoldBtn() {
        this.currentPlayer.holdScores()

        if (this.currentPlayer.getGlobalScore >= 10) {
            console.log('Tu as gagné mec')
            this.endGame()
            return
        }

        this.changePlayer()
    }

    changePlayer() {
        this.currentPlayer.setActive(false)

        if (this.currentPlayer === this.playerOne) {
            this.currentPlayer = this.playerTwo
        } else {
            this.currentPlayer = this.playerOne
        }

        this.currentPlayer.setActive(true)
    }

    endGame() {
        this.btnRollDice.removeEventListener('click', () =>
            this.onRollDiceBtn()
        )

        this.btnhold.removeEventListener('click', () => this.onHoldBtn())

        this.playerOne.reset()
        this.playerTwo.reset()
        this.currentPlayer = this.playerOne
        this.dice.className = `bi bi-question-square`
    }

    startGame() {
        this.playerOne.reset()
        this.playerTwo.reset()
        this.currentPlayer = this.playerOne
        // this.dice.className = `bi question-square`

        this.playerTwo.setActive(false)
        this.currentPlayer.setActive(true)

        this.btnRollDice.addEventListener('click', () => this.onRollDiceBtn())
        this.btnhold.addEventListener('click', () => this.onHoldBtn())
    }

    initGame() {
        this.dice.className = `bi bi-question-square`
        this.btnNewGame.addEventListener('click', () => {
            this.startGame()
        })
    }
}
