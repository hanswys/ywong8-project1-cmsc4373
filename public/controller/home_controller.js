import { GameState } from "../model/diceroll_game.js";
import { game, updateWindow } from "../view/home_page.js";


export function onClickPlayGame(e) {
    e.preventDefault();
    const selectedBet = document.querySelector('input[name="bet"]:checked').value;
    const selectedAmount = parseInt(document.getElementById('betAmount').value) || 0;

    const selectedRange = document.querySelector('input[name="rangeBet"]:checked').value;
    const selectedAmount1 = parseInt(document.getElementById('rangeBetAmount').value) || 0;
    const won = game.play(selectedBet, selectedAmount, selectedRange, selectedAmount1);
    game.gameState = GameState.PLAYING;
    updateWindow();

}

export function onClickNewGame(e) {
    game.gameState = GameState.INIT;
    game.newRound();
    updateWindow();
}

export function onShowKey(e) {
    if (e.target.checked) {
        showTextArea(); // Show the text area when checked
        // console.log("checked")
    } else {
        hideTextArea(); // Hide the text area when unchecked
        // console.log("unchecked")
    }
}

function showTextArea() {
    const divModals = document.querySelectorAll('.create-modal');
    const divButton = divModals[0];
    const divTextArea = divModals[1];
    divButton.classList.replace('d-block', 'd-none');
    divTextArea.classList.replace('d-none', 'd-block');
}

function hideTextArea() {
    const divModals = document.querySelectorAll('.create-modal');
    const divButton = divModals[0];
    const divTextArea = divModals[1];
    divButton.classList.replace('d-none', 'd-block');
    divTextArea.classList.replace('d-block', 'd-none');
}
