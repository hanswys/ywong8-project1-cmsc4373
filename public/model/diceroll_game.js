export const GameState = {
    INIT: 0, PLAYING: 1, DONE: 2,
}

export const CheatKey = {
    ON: 1, OFF: 0, 
}

export class DiceRollgame{
    play(){
        //
    }

    reset(){
        this.gameState = GameState.INIT;
        this.balance = 100;
        this.cheatKey = CheatKey.OFF;
    }
}