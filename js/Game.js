import Player from './models/Player.js'

export default class Game {
    constructor() {
        this.btnNewGame = document.querySelector('#btn-new-game')
        this.btnRollDice = document.querySelector('#btn-roll-dice')
        this.btnhold = document.querySelector('#btn-hold')

        this.dice = document.querySelector('#dice i')
        this.playerOne = new Player('#player-one')
        this.playerTwo = new Player('#player-two')

        this.currentPlayer = null
        this.initGame()
    }

    onRollDiceBtn() {
        console.log("I'm rolling")
        const randomNumber = Math.floor(Math.random() * 5 + 1)

        this.dice.className = `bi bi-dice-${randomNumber}`
        this.currentPlayer.updateCurrentScore(randomNumber)
    }

    onHoldBtn() {
        console.log("i'm holding button")
        this.currentPlayer.holdScores()
        this.currentPlayer.setActive(false)

        if (this.currentPlayer === this.playerOne) {
            this.currentPlayer = this.playerTwo
        } else {
            this.currentPlayer = this.playerOne
        }
        this.currentPlayer.setActive(true)

        // this.currentPlayer.setActive()
    }
    endGame() {
        this.btnRollDice.removeEventListener('click', () =>
            this.onRollDiceBtn()
        )
        this.btnhold.removeEventListener('click', () => this.onHoldBtn())
    }

    startGame() {
        this.currentPlayer = this.playerOne
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
