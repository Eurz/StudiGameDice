export default class Sounds {
    #soundsList
    constructor(soundAction) {
        this.#soundsList = {
            victory: './medias/applause.wav',
            roll: './medias/roll.wav',
            hold: './medias/hold.wav',
            music: './medias/music.mp3',
            laugh: './medias/rires.mp3',
            flawless: './medias/flawless-victory.mp3',
            outstanding: './medias/outstanding.mp3',
        }
        this._soundAction = soundAction
        this.soundGame = new Audio()
        this.play(this._soundAction)
    }

    play(soundsType) {
        this.soundGame.src = this.#soundsList[soundsType]
        this.soundGame.play()
    }
}
