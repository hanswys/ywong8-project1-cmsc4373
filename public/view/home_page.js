import { currentUser } from "../controller/firebase_auth.js";
import { root } from "./element.js";
import { protectedView } from "./protected_view.js";
import { onClickNewGame, onClickPlayGame, onShowKey } from "../controller/home_controller.js";
import { DiceRollgame, GameState } from "../model/diceroll_game.js";

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

    // const showKeyCheckbox = divWrapper.querySelector('#show-key');
    // const textAreaModal = divWrapper.querySelector('#text-area-modal');
    // const odd = divWrapper.querySelector('#odd');
    // const even = divWrapper.querySelector('#even');
    // const betAmt = divWrapper.querySelector('#betAmount');



    root.innerHTML = '';
    root.appendChild(divWrapper);


    updateWindow();

}


export function updateWindow() {
    const playButton = document.querySelector('#button-play-game');
    const newButton = document.querySelector('#button-new-game');
    const showKeyCheckbox = document.querySelector('#show-key');
    const selectedBet = document.querySelector('input[name="bet"]:checked').value;
    const selectedAmount = betAmount.value;
    const selectedRange = document.querySelector('input[name="rangeBet"]:checked').value;
    const selectedAmount1 = rangeBetAmount.value;
    const betAmountSelect = document.querySelector('#betAmount');
    switch (game.gameState) {
        case GameState.INIT:
            betAmountSelect.value = betAmount.value;
            showKeyCheckbox.onchange = onShowKey;
            document.getElementById('cheat-key').innerHTML = `${game.value}`;
            playButton.disabled = false;
            document.getElementById('message').innerHTML = 'Choose bet(s) and press [PLAY] ';
            document.getElementById('number').innerHTML = '?';
            document.getElementById('cheat-key').innerHTML = `${game.value}`;
            newButton.disabled = true;
            console.log(selectedAmount);
            break;
        case GameState.PLAYING:
            showKeyCheckbox.onchange = onShowKey;
            document.getElementById('cheat-key').innerHTML = `${game.value}`;
            document.getElementById('number').innerHTML = `${game.value}`;
            document.getElementById('balance').innerHTML = `Balance: ${game.balance}`;
            document.getElementById('message').innerHTML = "";
            console.log(selectedAmount);

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
            playButton.disabled = true;
            newButton.disabled = false;
            break;
    }
}