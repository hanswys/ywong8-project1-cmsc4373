export const GameState = {
    INIT: 0, PLAYING: 1, OVER: 2
}

export const CheckedKey = {
    OFF: 0, ON: 1
}

export class DiceRollgame {
    constructor() {
        this.reset();
    }

    play(bet, betAmount, rangeBet, rangeBetAmount) {
        let winningsfromBet = 0;
        let winningsfromRangeBet = 0;
        let currentValue = this.value;

        // console.log("model" + bet);
        if (betAmount != 0) {
            if (bet == "odd") {
                if (currentValue % 2 != 0) {
                    console.log("correct bet")
                    winningsfromBet += betAmount * 2;
                } else {
                    console.log("failed bet")
                    winningsfromBet -= betAmount;
                }
            } else {
                if (currentValue % 2 == 0) {
                    console.log("correct bet")
                    winningsfromBet += betAmount * 2;
                } else {
                    console.log("failed bet")
                    winningsfromBet -= betAmount;
                }
            }
        }

        if (rangeBetAmount != 0) {
            if (rangeBet == "1-2") {
                // console.log("12")
                if (currentValue == 1 || currentValue == 2) {
                    winningsfromRangeBet += rangeBetAmount * 3;
                } else {
                    winningsfromRangeBet -= rangeBetAmount;
                }
            } else if (rangeBet == "3-4") {
                if (currentValue == 3 || currentValue == 4) {
                    winningsfromRangeBet += rangeBetAmount * 3;
                } else {
                    winningsfromRangeBet -= rangeBetAmount;
                }
            } else {
                if (currentValue == 5 || currentValue == 6) {
                    winningsfromRangeBet += rangeBetAmount * 3;
                } else {
                    winningsfromRangeBet -= rangeBetAmount;
                }
            }
        }

        this.balance += winningsfromBet;
        this.balance += winningsfromRangeBet;
        this.amountWonFromOdds = winningsfromBet;
        this.amountWonFromRange = winningsfromRangeBet;


    }

    reset() {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        this.gameState = GameState.INIT;
        this.balance = 100;
        this.value = randomNumber;
        this.checkedKeyState = CheckedKey.OFF;
        this.betAmount;
    }

    newRound(){
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        this.gameState = GameState.INIT;
        this.value = randomNumber;
    }

    checkedKeyOn(){
        this.checkedKeyState = CheckedKey.ON;
    }

    checkedKeyOff(){
        this.checkedKeyState = CheckedKey.OFF;
    }

}