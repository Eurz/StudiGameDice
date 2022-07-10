export default class Player {
    constructor(idHtmlString) {
        this.root = document.querySelector(idHtmlString)
        this.name = this.root.querySelector('.player-name')
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
        }
    }

    updateCurrentScore(number) {
        this.currentScore += number
        this.displayScores()
    }

    displayScores() {
        this.currentScoreDiv.textContent = this.currentScore
    }

    holdScores() {
        this.globalScore += this.currentScore
        this.globalScoreDiv.textContent = this.globalScore
        this.currentScore = 0
        this.currentScoreDiv.textContent = 0
    }
}
