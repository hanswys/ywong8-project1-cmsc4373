import { GameState } from "../model/diceroll_game.js";
import { game, updateWindow } from "../view/home_page.js";


export function onClickPlayGame(e){
    e.preventDefault();
const randomNumber = Math.floor(Math.random() * 6) + 1;
console.log(randomNumber);
document.getElementById('number').innerHTML = randomNumber;
game.gameState = GameState.PLAYING;
updateWindow();

}