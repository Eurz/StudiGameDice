import Player from './models/Player.js'

export default class Game {
    /**
     *
     * @param {Object} playerOne - Player object from class "Player"
     * @param {Object} playerTwo - Player object from class "Player"
     */
    constructor(playerOne, playerTwo) {
        this.btnNewGame = document.querySelector('#btn-new-game')
        this.btnRollDice = document.querySelector('#btn-roll-dice')
        this.btnhold = document.querySelector('#btn-hold')
        this.maxScore = 100
        this.dice = document.querySelector('#dice-container i')

        this.playerOne = playerOne
        this.playerTwo = playerTwo

        this.currentPlayer = null
        this.score = 0
        const messageContainer = document.querySelector('#message')
        messageContainer.textContent = `Score à atteindre : ${this.maxScore} pts`

        this.desactiveBtn()
        this.dice.className = `bi bi-question-square`
        this.btnNewGame.addEventListener('click', this.newGame)
    }

    /**
     *
     * @returns Random value between 1 and 6 when dice is rolling
     */
    onRollDiceBtn = () => {
        const randomNumber = Math.floor(Math.random() * 5 + 1)
        this.dice.className = `bi bi-dice-${randomNumber}`

        if (randomNumber === 1) {
            this.currentPlayer.updateScore(0, 0)
            this.changePlayer()
            return
        }

        this.score += randomNumber
        this.currentPlayer.updateScore(0, this.score)
    }

    /**
     *
     * @returns Current player receives current points in his global score and change the current player
     */
    onHoldBtn = () => {
        this.currentPlayer.updateScore(this.score, 0)
        this.score = 0

        if (this.currentPlayer.getGlobalScore >= this.maxScore) {
            this.endGame()
            return
        }

        this.changePlayer()
    }

    /**
     * Set new current player
     */
    changePlayer = () => {
        this.score = 0

        this.currentPlayer.setActive(false)

        if (this.currentPlayer === this.playerOne) {
            this.currentPlayer = this.playerTwo
        } else {
            this.currentPlayer = this.playerOne
        }

        this.currentPlayer.setActive(true)
    }

    /**
     * End of game
     */
    endGame = () => {
        this.btnRollDice.removeEventListener('click', this.onRollDiceBtn)

        this.btnhold.removeEventListener('click', this.onHoldBtn)

        this.currentPlayer = this.playerOne
        this.dice.className = `bi bi-question-square`
        this.score = 0
        this.desactiveBtn()
    }

    newGame = () => {
        this.currentPlayer = this.playerOne
        this.playerOne.resetScore()
        this.playerTwo.resetScore()

        this.currentPlayer.setActive(true)

        this.btnRollDice.addEventListener('click', this.onRollDiceBtn)
        this.btnhold.addEventListener('click', this.onHoldBtn)
        this.activeBtn()
    }

    desactiveBtn = () => {
        this.btnRollDice.classList.add('opacity-50')
        this.btnhold.classList.add('opacity-50')
    }

    activeBtn = () => {
        this.btnRollDice.classList.remove('opacity-50')
        this.btnhold.classList.remove('opacity-50')
    }
}
