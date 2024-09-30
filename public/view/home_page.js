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

    root.innerHTML = '';
    root.appendChild(divWrapper);

    const playButton = divWrapper.querySelector('#button-play-game');
    playButton.onclick = onClickPlayGame;

    const newButton = divWrapper.querySelector('#button-new-game');
    newButton.onclick = onClickNewGame;

    const showKeyCheckbox = document.querySelector('#show-key');
    const textAreaModal = document.querySelector('#text-area-modal');
    showKeyCheckbox.onchange = onShowKey;
    document.getElementById('cheat-key').innerHTML = `${game.value}`;
    
}


export function updateWindow() {
    const playButton = document.querySelector('#button-play-game');
    const newButton = document.querySelector('#button-new-game');
    switch (game.gameState) {
        case GameState.INIT:
            playButton.disabled = false;
            document.getElementById('message').innerHTML = 'Choose bet(s) and press [PLAY] ';
            document.getElementById('number').innerHTML = '?';
            document.getElementById('cheat-key').innerHTML = `${game.value}`;
            newButton.disabled = true;
            break;
        case GameState.PLAYING:
            document.getElementById('number').innerHTML = `${game.value}`;
            const selectedBet = document.querySelector('input[name="bet"]:checked').value;
            const selectedAmount = betAmount.value;
            const selectedRange = document.querySelector('input[name="rangeBet"]:checked').value;
            const selectedAmount1 = rangeBetAmount.value;
            // console.log("balance after betting" + game.balance);
            document.getElementById('balance').innerHTML = `Balance: ${game.balance}`;
            if(selectedAmount1 == 0){
                // add win lose amounts 
                document.getElementById('message').innerHTML = `
                TEST <br>
                No bet on range
                `;
            } else if (selectedAmount == 0){
                // same here
                    document.getElementById('message').innerHTML = `
                    No bet on odd/even <br>
                    Test
                    `;
            }
            playButton.disabled = true;
            newButton.disabled = false;
            break;
    }
}