export default class Player {
    /**
     *
     * @param {HTMLElement} idHtmlString - Html id of the div wich display player's name
     * @param {String} playerName - Player's name
     */
    constructor(idHtmlString, playerName) {
        this.root = document.querySelector(idHtmlString)
        this.nameContainer = this.root.querySelector('.player-name')
        this.nameContainer.textContent = playerName

        this.playerName = playerName
        this.globalScoreDiv = this.root.querySelector('.global-score')
        this.currentScoreDiv = this.root.querySelector('.current-score')
        this.globalScore = 0
        this.currentScore = 0
    }

    setActive(isActive) {
        if (isActive) {
            this.nameContainer.classList.add('opacity-100', 'selected-player')
        } else {
            this.nameContainer.classList.remove(
                'opacity-100',
                'selected-player'
            )
        }
        this.setCurrentScore = 0
    }

    updateScore(globalScore = 0, currentScore = 0) {
        if (currentScore === 0) {
            this.setCurrentScore = 0
        }
        this.setCurrentScore = currentScore

        if (globalScore !== 0) {
            this.setGlobalScore = this.getGlobalScore + globalScore
            this.setCurrentScore = 0
        }

        this.currentScoreDiv.textContent = this.getCurrentScore
        this.globalScoreDiv.textContent = this.getGlobalScore
    }

    resetScore() {
        this.setGlobalScore = 0
        this.setCurrentScore = 0
        this.currentScoreDiv.textContent = this.getCurrentScore
        this.globalScoreDiv.textContent = this.getGlobalScore
    }

    animateCurrentScore() {
        const target = this.root
            .querySelector('.anime-container')
            .querySelector('.anime')
        target.classList.add('anime-current')

        target.addEventListener('animationend', () => {
            target.classList.remove('anime-current')
        })
    }

    get getGlobalScore() {
        return this.globalScore
    }

    set setGlobalScore(score) {
        this.globalScore = score
    }

    get getCurrentScore() {
        return this.currentScore
    }

    set setCurrentScore(score) {
        this.currentScore = score
    }

    get getName() {
        return this.playerName
    }
}
