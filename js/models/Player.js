export default class Player {
    /**
     *
     * @param {HTMLElement} idHtmlString - Html id of the div wich display player's name
     * @param {String} playerName - Player's name
     */
    constructor(idHtmlString, playerName) {
        this.root = document.querySelector(idHtmlString)
        this.name = this.root.querySelector('.player-name')
        this.name.textContent = playerName
        this.globalScoreDiv = this.root.querySelector('.global-score')
        this.currentScoreDiv = this.root.querySelector('.current-score')
        this.globalScore = 0
        this.currentScore = 0
    }

    setActive(isActive) {
        if (isActive) {
            this.name.classList.add('opacity-100', 'selected-player')
        } else {
            this.name.classList.remove('opacity-100', 'selected-player')
            this.currentScore = 0
            this.holdScores()
        }
    }

    updateCurrentScore(number) {
        this.currentScore += number
        this.currentScoreDiv.textContent = this.currentScore
    }

    holdScores() {
        this.globalScore += this.currentScore
        this.globalScoreDiv.textContent = this.globalScore
        this.currentScore = 0
        this.currentScoreDiv.textContent = 0
    }

    reset() {
        this.globalScore = 0
        this.currentScore = 0
        this.holdScores()
        // this.setActive(false)
    }
    animateGlobalScore() {}

    get getGlobalScore() {
        return this.globalScore
    }
}
