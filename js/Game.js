import Player from './models/Player.js'
import Sounds from './Sounds.js'

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
        this.maxScore = 10
        this.dice = document.querySelector('#dice-container i')

        this.playerOne = playerOne
        this.playerTwo = playerTwo

        this.currentPlayer = null
        this.score = 0
        const messageContainer = document.querySelector('#message')
        messageContainer.textContent = `Score à atteindre : ${this.maxScore} pts`
        this.soundsEffect = new Sounds()
        this.init()
    }

    init = () => {
        this.desactiveBtn()
        this.dice.className = `bi bi-question-square`
        this.btnNewGame.addEventListener('click', this.newGame)
    }
    /**
     *
     * @returns Random value between 1 and 6 when dice is rolling
     */
    onRollDiceBtn = () => {
        this.soundsEffect.play('roll')

        const randomNumber = Math.floor(Math.random() * 5 + 1)
        this.dice.className = `bi bi-dice-${randomNumber}`

        if (randomNumber === 1) {
            this.currentPlayer.updateScore(0, 0)
            this.changePlayer()
            return
        }
        this.currentPlayer.animateCurrentScore()

        this.score += randomNumber
        this.currentPlayer.updateScore(0, this.score)
    }

    /**
     *
     * @returns Current player receives current points in his global score and change the current player
     */
    onHoldBtn = () => {
        this.soundsEffect.play('hold')

        this.currentPlayer.updateScore(this.score, 0)
        this.score = 0

        if (this.currentPlayer.getGlobalScore >= this.maxScore) {
            this.soundsEffect.play('victory')

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
        const myModal = new bootstrap.Modal(
            document.getElementById('mainModal'),
            { backdrop: 'static' }
        )

        const target = document.querySelector('#mainModal')

        target.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                <img src="../img/victoire.jpg" class="img-fluid mb-4" alt="${this.currentPlayer.getName} a gagné ">
                ${this.currentPlayer.getName} a remporté la partie avec un score de ${this.currentPlayer.getGlobalScore} points</div>
                <div class="p-3">
                <div class="d-grid gap-2">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Sortir</button>
                    <button type="button" class="btn bg-main-game text-white" id="modal-btn-new-game">Nouvelle partie</button>        
                    </div>
                </div>
            </div>
        </div>
        `
        myModal.show()

        const modalNewGameBtn = target.querySelector('#modal-btn-new-game')
        modalNewGameBtn.addEventListener('click', () => {
            myModal.hide()
            this.newGame()
        })

        this.currentPlayer = this.playerOne
        this.dice.className = `bi bi-question-square`
        this.score = 0

        this.btnOff(this.btnRollDice, this.onRollDiceBtn)
        this.btnOff(this.btnhold, this.onHoldBtn)
        this.btnOn(this.btnNewGame, this.newGame)
    }

    newGame = () => {
        this.soundsEffect.play('laugh')

        this.currentPlayer = this.playerOne
        this.playerOne.resetScore()
        this.playerTwo.resetScore()

        this.currentPlayer.setActive(true)

        this.btnOff(this.btnNewGame, this.newGame)
        this.btnOn(this.btnRollDice, this.onRollDiceBtn)
        this.btnOn(this.btnhold, this.onHoldBtn)

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

    btnOff = (btn, callback) => {
        btn.classList.add('opacity-50')
        btn.removeEventListener('click', callback)
    }

    btnOn = (btn, callback) => {
        btn.classList.remove('opacity-50')
        btn.addEventListener('click', callback)
    }
}
