import { currentUser } from "../controller/firebase_auth.js";
import { root } from "./element.js";
import { protectedView } from "./protected_view.js";
import { onClickNewGame, onClickPlayGame, onShowKey } from "../controller/home_controller.js";
import { CheatKey, DiceRollgame, GameState } from "../model/diceroll_game.js";
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

    // const betForm = document.getElementById('betForm');
    // const betAmount = document.getElementById('betAmount');
    // const rangeBetForm = document.getElementById('rangeBetForm');
    // const rangeBetAmount = document.getElementById('rangeBetAmount');
    // // const showKeyCheckbox = divWrapper.querySelector('#show-key');
    // const cheatKeyDiv = document.getElementById('cheat-key');
    const showKeyCheckbox = document.querySelector('#show-key');
    const textAreaModal = document.querySelector('#text-area-modal');
    showKeyCheckbox.onchange = onShowKey;
    document.getElementById('cheat-key').innerHTML = `${game.value}`;
    
}

export let game = new DiceRollgame();

export function updateWindow() {
    switch (game.gameState) {
        case GameState.INIT:
            document.getElementById('message').innerHTML = 'Choose bet(s) and press [PLAY] ';
            document.getElementById('number').innerHTML = '?';
            document.getElementById('cheat-key').innerHTML = `${game.value}`;
            break;
        case GameState.PLAYING:
            document.getElementById('number').innerHTML = `${game.value}`;
            const selectedBet = document.querySelector('input[name="bet"]:checked').value;
            const selectedAmount = betAmount.value;
            // console.log('Bet on:', selectedBet);
            // console.log('Bet amount:', selectedAmount ? selectedAmount : 'No amount selected');

            const selectedRange = document.querySelector('input[name="rangeBet"]:checked').value;

            const selectedAmount1 = rangeBetAmount.value;
            console.log("balance after betting" + game.balance);

            // console.log('Bet on range:', selectedRange);
            // console.log('Bet amount:', selectedAmount1 ? selectedAmount1 : 'No amount selected');


            break;
    }
}