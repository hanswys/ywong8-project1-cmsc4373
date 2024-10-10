import { CheckedKey, CheckedRange, GameState } from "../model/diceroll_game.js";
import { game, updateWindow } from "../view/home_page.js";
import { currentUser } from "./firebase_auth.js";
import { DEV } from "../model/constants.js";
import { addDiceRollGameRecord } from "./firebase_controller.js";


export async function onClickPlayGame(e) {
    e.preventDefault();
    const selectedBet = document.querySelector('input[name="bet"]:checked').value;
    const selectedAmount = parseInt(document.getElementById('betAmount').value) || 0;
    const selectedRange = document.querySelector('input[name="rangeBet"]:checked').value;
    const selectedAmount1 = parseInt(document.getElementById('rangeBetAmount').value) || 0;
    const won = game.play(selectedBet, selectedAmount, selectedRange, selectedAmount1);
    await savePlayRecord();
    game.gameState = GameState.OVER;
    updateWindow();

}

export function onClickNewGame(e) {
    game.gameState = GameState.INIT;
    game.newRound();
    updateWindow();
}

export function onShowKey(e) {
    if (e.target.checked) {
        game.checkedKeyState = CheckedKey.ON;
    } else {
        game.checkedKeyState = CheckedKey.OFF;
    }
    updateWindow();
}

// export function showTextArea() {
//     const divModals = document.querySelectorAll('.create-modal');
//     const divButton = divModals[0];
//     const divTextArea = divModals[1];
//     divButton.classList.replace('d-block', 'd-none');
//     divTextArea.classList.replace('d-none', 'd-block');
// }

// export function hideTextArea() {
//     const divModals = document.querySelectorAll('.create-modal');
//     const divButton = divModals[0];
//     const divTextArea = divModals[1];
//     divButton.classList.replace('d-none', 'd-block');
//     divTextArea.classList.replace('d-block', 'd-none');
// }

export async function savePlayRecord(){
    const selectedAmount = parseInt(document.getElementById('betAmount').value) || 0;
    const selectedAmount1 = parseInt(document.getElementById('rangeBetAmount').value) || 0;
    const email = currentUser.email;
    const balance = game.balance;
    const timestamp = Date.now();
    const win =  game.amountWonFromOdds + game.amountWonFromRange;
    const bet = selectedAmount + selectedAmount1;

    const playRecord = {balance, bet, email, timestamp, win};

    const div = document.createElement('div');
    div.classList.add('text-white', 'bg-primary');
    div.textContent = 'Saving to Firestore ...';
    document.getElementById('message').appendChild(div);

    try{
        await addDiceRollGameRecord(playRecord);
    } catch(e){
        if(DEV) console.log('failed to save play record', e);
        alert(`
            Failed to save: ${JSON.stringify(e)} `);
    }

    div.remove();


}

export function onChangeBetAmountForm(){
    const selectedBet = document.querySelector('#betAmount').value;
    const selectedRangeBet = document.querySelector('#rangeBetAmount').value;
    game.betAmount = selectedBet;
    game.rangeBetAmount = selectedRangeBet;
    if (selectedBet != 0 || selectedRangeBet != 0){
        game.gameState = GameState.PLAYING;
    } else {
        game.gameState = GameState.INIT;
    }
    updateWindow();
}

export function onChangeRangeBetAmountForm(){
    const selectedBet = document.querySelector('#betAmount').value;
    const selectedRangeBet = document.querySelector('#rangeBetAmount').value;
    game.betAmount = selectedBet;
    game.rangeBetAmount = selectedRangeBet;
    if (selectedBet != 0 || selectedRangeBet != 0){
        game.gameState = GameState.PLAYING;
    } else {
        game.gameState = GameState.INIT;
    }
    updateWindow();
}

export function onChangeOdd(){
    game.oddChecked = true;
    updateWindow();
}

export function onChangeEven(){
    game.oddChecked = false;
    updateWindow();
}
export function onChangeRange1(){
    game.CheckedRange = CheckedRange.RANGE1;
    updateWindow();
}

export function onChangeRange2(){
    game.CheckedRange = CheckedRange.RANGE2;
    updateWindow();
}

export function onChangeRange3(){
    game.CheckedRange = CheckedRange.RANGE3;
    updateWindow();
}


