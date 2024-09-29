import { currentUser } from "../controller/firebase_auth.js";
import { root } from "./element.js";
import { protectedView } from "./protected_view.js";
import { onClickNewGame, onClickPlayGame } from "../controller/home_controller.js";
import { CheatKey, DiceRollgame, GameState } from "../model/diceroll_game.js";
export async function homePageView(){
    if (!currentUser){
        root.innerHTML = await protectedView();
        return;
    }

    const response = await fetch('/view/templates/home_page_template.html',
        {cache: 'no-store'});
        const divWrapper = document.createElement('div');
        divWrapper.innerHTML = await response.text();
        divWrapper.classList.add('m-4', 'p-4')

        root.innerHTML = '';
        root.appendChild(divWrapper);

        const playButton = divWrapper.querySelector('#button-play-game');
        playButton.onclick = onClickPlayGame;

        const newButton = divWrapper.querySelector('#button-new-game');
        newButton.onclick = onClickNewGame;
}

export let game = new DiceRollgame();

export function updateWindow(){
    switch (game.gameState){
        case GameState.INIT:
        document.getElementById('message').innerHTML = 'Press New Game to Start';
        break;
        case GameState.PLAYING:
            if(game.cheatKey == CheatKey.ON){
                
            }
            document.getElementById('message').innerHTML = `${game.value}`;
        break;
        case GameState.DONE:
        break;
            }
}