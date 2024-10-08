import { currentUser } from "../controller/firebase_auth.js";
import { root } from "./element.js";
import { protectedView } from "./protected_view.js";
import { onClickNewGame, onClickPlayGame, onShowKey, showTextArea, hideTextArea, onChangeBetAmountForm,  } from "../controller/home_controller.js";
import { CheckedKey, DiceRollgame, GameState } from "../model/diceroll_game.js";

export let game = new DiceRollgame();

export async function homePageView() {
    if (!currentUser) {
        root.innerHTML = await protectedView();
        return;
    }

    const response = await fetch('/view/templates/home_page_template.html',
        { cache: 'no-store' });
    const divWrapper = document.createElement('div');
    divWrapper.innerHTML = await response.text();
    divWrapper.classList.add('m-4', 'p-4')

    const playButton = divWrapper.querySelector('#button-play-game');
    playButton.onclick = onClickPlayGame;

    const newButton = divWrapper.querySelector('#button-new-game');
    newButton.onclick = onClickNewGame;

    const showKeyCheckbox = divWrapper.querySelector('#show-key');
    showKeyCheckbox.onchange = onShowKey;

    const betAmountForm = divWrapper.querySelector('#betAmount');
    betAmountForm.onchange = onChangeBetAmountForm;


    root.innerHTML = '';
    root.appendChild(divWrapper);

    updateWindow();

}


export function updateWindow() {
    const playButton = document.querySelector('#button-play-game');
    const newButton = document.querySelector('#button-new-game');
    // const showKeyCheckbox = document.querySelector('#show-key');
    // const betAmountSelect = document.querySelector('#betAmount');
    switch (game.gameState) {
        case GameState.INIT:
            // betAmountSelect.value = betAmount;
            document.getElementById('cheat-key').innerHTML = `${game.value}`;
            document.getElementById('message').innerHTML = 'Choose bet(s) and press [PLAY] ';
            document.getElementById('number').innerHTML = '?';
            // document.getElementById('betAmount').innerHTML = game.bet;
            if(CheckedKey.ON){
                showTextArea;
            } else {
                hideTextArea;
            }
            playButton.disabled = false;
            newButton.disabled = true;
            break;
        case GameState.PLAYING:
            if(CheckedKey.ON){
                showTextArea;
            } else {
                hideTextArea;
            }
            // betAmountSelect.value = betAmount;
            // showKeyCheckbox.onchange = onShowKey;
            const selectedBet = document.querySelector('input[name="bet"]:checked').value;
            const selectedRange = document.querySelector('input[name="rangeBet"]:checked').value;
            document.getElementById('cheat-key').innerHTML = `${game.value}`;
            document.getElementById('number').innerHTML = `${game.value}`;
            document.getElementById('balance').innerHTML = `Balance: ${game.balance}`;
            document.getElementById('message').innerHTML = "";
            playButton.disabled = true;
            newButton.disabled = false;
            break;
        case GameState.OVER:
            if (game.amountWonFromOdds > 0) {
                document.getElementById('message').innerHTML += `
            You won $${game.amountWonFromOdds} on ${selectedBet} <br>
            `;
            } else if (game.amountWonFromOdds < 0) {
                document.getElementById('message').innerHTML += `
            You lost $${game.amountWonFromOdds * -1} on ${selectedBet} <br>
            `;
            } else {
                document.getElementById('message').innerHTML += `
            No bet on odds/even <br>
            `;
            }

            if (game.amountWonFromRange > 0) {
                document.getElementById('message').innerHTML += `
                You won $${game.amountWonFromRange} on ${selectedRange} <br>
                `;
            } else if (game.amountWonFromRange < 0) {
                document.getElementById('message').innerHTML += `
                You lost $${game.amountWonFromRange * -1} on ${selectedRange} <br>
                `;
            } else {
                document.getElementById('message').innerHTML += `
                No bet on range <br>
                `;

            }
            playButton.disabled = false;
            newButton.disabled = true;
            break;
    }
}