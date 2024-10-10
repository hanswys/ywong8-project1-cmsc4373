import { currentUser } from "../controller/firebase_auth.js";
import { root } from "./element.js";
import { protectedView } from "./protected_view.js";
import {
    onClickNewGame, onClickPlayGame, onShowKey, onChangeBetAmountForm, onChangeRangeBetAmountForm,
    onChangeOdd, onChangeEven, onChangeRange1, onChangeRange2, onChangeRange3
} from "../controller/home_controller.js";
import { CheckedKey, CheckedRange, DiceRollgame, GameState } from "../model/diceroll_game.js";

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

    const rangeBetAmount = divWrapper.querySelector('#rangeBetAmount');
    rangeBetAmount.onchange = onChangeRangeBetAmountForm;

    const oddRadio = divWrapper.querySelector('#odd');
    oddRadio.onchange = onChangeOdd;

    const evenRadio = divWrapper.querySelector('#even');
    evenRadio.onchange = onChangeEven;

    const range1 = divWrapper.querySelector('#range1-2');
    range1.onchange = onChangeRange1;

    const range2 = divWrapper.querySelector('#range3-4');
    range2.onchange = onChangeRange2;

    const range3 = divWrapper.querySelector('#range5-6');
    range3.onchange = onChangeRange3;

    root.innerHTML = '';
    root.appendChild(divWrapper);

    updateWindow();

}


export function updateWindow() {
    const playButton = document.querySelector('#button-play-game');
    const newButton = document.querySelector('#button-new-game');
    const betAmount = document.querySelector('#betAmount');
    const rangeBetAmount = document.querySelector('#rangeBetAmount');
    const oddRadio = document.querySelector('#odd');
    const evenRadio = document.querySelector('#even');
    const range1Radio = document.querySelector('#range1-2');
    const range2Radio = document.querySelector('#range3-4');
    const range3Radio = document.querySelector('#range5-6');
    const showKeyCheckbox = document.querySelector('#show-key');


    switch (game.gameState) {
        case GameState.INIT:
            console.log("init");
            if (game.CheckedRange == CheckedRange.RANGE1) {
                range1Radio.checked = true;
                range2Radio.checked = false;
                range3Radio.checked = false;
            } else if (game.CheckedRange == CheckedRange.RANGE2) {
                range1Radio.checked = false;
                range2Radio.checked = true;
                range3Radio.checked = false;
            } else {
                range1Radio.checked = false;
                range2Radio.checked = false;
                range3Radio.checked = true;
            }
            betAmount.value = game.betAmount;
            rangeBetAmount.value = game.rangeBetAmount;
            if (game.oddChecked == true) {
                oddRadio.checked = true;
                evenRadio.checked = false;
            } else {
                evenRadio.checked = true;
                oddRadio.checked = false;
            }
            // document.getElementById('key-va;ue').innerHTML = `${game.value}`;
            document.getElementById('message').innerHTML = 'Choose bet(s) and press [PLAY] ';
            document.getElementById('number').innerHTML = '?';
            if (game.checkedKeyState == CheckedKey.ON) {
            showKeyCheckbox.checked = true;
            document.getElementById('key-value').innerHTML = `Game Key: ${game.value}`;
            } else {
            showKeyCheckbox.checked = false;
            document.getElementById('key-value').innerHTML = ``;
            }
            betAmount.disabled = false;
            rangeBetAmount.disabled = false;
            oddRadio.disabled = false;
            evenRadio.disabled = false;
            range1Radio.disabled = false;
            range2Radio.disabled = false;
            range3Radio.disabled = false;
            playButton.disabled = true;
            newButton.disabled = true;
            break;
        case GameState.PLAYING:
            console.log("playing");
            if (game.CheckedRange == CheckedRange.RANGE1) {
                range1Radio.checked = true;
                range2Radio.checked = false;
                range3Radio.checked = false;
            } else if (game.CheckedRange == CheckedRange.RANGE2) {
                range1Radio.checked = false;
                range2Radio.checked = true;
                range3Radio.checked = false;
            } else {
                range1Radio.checked = false;
                range2Radio.checked = false;
                range3Radio.checked = true;
            }
            if (game.oddChecked == true) {
                oddRadio.checked = true;
                evenRadio.checked = false;
            } else {
                evenRadio.checked = true;
                oddRadio.checked = false;
            }
            betAmount.value = game.betAmount;
            rangeBetAmount.value = game.rangeBetAmount;
            document.getElementById('message').innerHTML = 'Choose bet(s) and press [PLAY] ';
            document.getElementById('number').innerHTML = '?';
            if (game.checkedKeyState == CheckedKey.ON) {
                showKeyCheckbox.checked = true;
                document.getElementById('key-value').innerHTML = `Game Key: ${game.value}`;
                } else {
                showKeyCheckbox.checked = false;
                document.getElementById('key-value').innerHTML = ``;
                }

            playButton.disabled = false;
            newButton.disabled = true;
            break;
        case GameState.OVER:
            if (game.CheckedRange == CheckedRange.RANGE1) {
                range1Radio.checked = true;
                range2Radio.checked = false;
                range3Radio.checked = false;
            } else if (game.CheckedRange == CheckedRange.RANGE2) {
                range1Radio.checked = false;
                range2Radio.checked = true;
                range3Radio.checked = false;
            } else {
                range1Radio.checked = false;
                range2Radio.checked = false;
                range3Radio.checked = true;
            }
            if (game.oddChecked == true) {
                oddRadio.checked = true;
                evenRadio.checked = false;
            } else {
                evenRadio.checked = true;
                oddRadio.checked = false;
            }
            console.log("over")
            betAmount.value = game.betAmount;
            rangeBetAmount.value = game.rangeBetAmount;
            document.getElementById('number').innerHTML = `${game.value}`;
            document.getElementById('balance').innerHTML = `Balance: ${game.balance}`;
            document.getElementById('message').innerHTML = "";

            if (game.checkedKeyState == CheckedKey.ON) {
                showKeyCheckbox.checked = true;
                document.getElementById('key-value').innerHTML = `Game Key: ${game.value}`;
                } else {
                showKeyCheckbox.checked = false;
                document.getElementById('key-value').innerHTML = ``;
                }
                
            if (game.amountWonFromOdds > 0) {
                if(game.oddChecked == true){
                    document.getElementById('message').innerHTML += `
            You won $${game.amountWonFromOdds} on odd <br>
            `;
                } else{
                    document.getElementById('message').innerHTML += `
            You won $${game.amountWonFromOdds} on even <br>
            `;
                }
            } else if (game.amountWonFromOdds < 0) {
                if(game.oddChecked == true){
                    document.getElementById('message').innerHTML += `
            You lost $${game.amountWonFromOdds * -1} on odd <br>
            `;
                }
                document.getElementById('message').innerHTML += `
            You lost $${game.amountWonFromOdds * -1} on even <br>
            `;
            } else {
                document.getElementById('message').innerHTML += `
            No bet on odds/even <br>
            `;
            }
            let rangeText = "";
            if(game.CheckedRange = CheckedRange.RANGE1){
                rangeText = "range 1-2";
            } else if(game.CheckedRange = CheckedRange.RANGE2){
                rangeText = "range 3-4";
            } else {
                rangeText = "range 4-5";
            }

            if (game.amountWonFromRange > 0) {
                document.getElementById('message').innerHTML += `
                You won $${game.amountWonFromRange} on ${rangeText} <br>
                `;
            } else if (game.amountWonFromRange < 0) {
                document.getElementById('message').innerHTML += `
                You lost $${game.amountWonFromRange * -1} on ${rangeText} <br>
                `;
            } else {
                document.getElementById('message').innerHTML += `
                No bet on range <br>
                `;

            }
            betAmount.disabled = true;
            rangeBetAmount.disabled = true;
            oddRadio.disabled = true;
            evenRadio.disabled = true;
            range1Radio.disabled = true;
            range2Radio.disabled = true;
            range3Radio.disabled = true;
            playButton.disabled = true;
            newButton.disabled = false;
            break;
    }
}