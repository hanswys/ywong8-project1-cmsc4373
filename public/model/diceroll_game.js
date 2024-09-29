export const GameState = {
    INIT: 0, PLAYING: 1, DONE: 2,
}

export const CheatKey = {
    ON: 1, OFF: 0, 
}

export class DiceRollgame{
    constructor(){
        this.reset();
    }
    play(){
        
    }

    reset(){
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        this.gameState = GameState.INIT;
        this.balance = 100;
        this.cheatKey = CheatKey.OFF;
        this.value = randomNumber;
    }
}