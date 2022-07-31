import Game from './Game.js'
import Player from './models/Player.js'

const playerOne = new Player('#player-one', 'John')
const playerTwo = new Player('#player-two', 'Jane')

const game = new Game(playerOne, playerTwo)
