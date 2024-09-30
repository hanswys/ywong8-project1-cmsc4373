export const GameState = {
    INIT: 0, PLAYING: 1,
}

export class DiceRollgame {
    constructor() {
        this.reset();
    }
    play(bet, betAmount, rangeBet, rangeBetAmount) {
        let winnings = 0;
        let currentValue = this.value;

        // console.log("model" + bet);
        if (betAmount != 0) {
            if (bet == "odd") {
                if (currentValue % 2 != 0) {
                    console.log("correct bet")
                    winnings += betAmount * 2;
                } else {
                    console.log("failed bet")
                    winnings -= betAmount;
                }
            } else {
                if (currentValue % 2 == 0) {
                    console.log("correct bet")
                    winnings += betAmount * 2;
                } else {
                    console.log("failed bet")
                    winnings -= betAmount;
                }
            }
        }

        if (rangeBetAmount != 0) {
            if (rangeBet == "1-2") {
                // console.log("12")
                if (currentValue == 1 || currentValue == 2) {
                    winnings += rangeBetAmount * 3;
                }
            } else if (rangeBet == "3-4") {
                if (currentValue == 3 || currentValue == 4) {
                    winnings += rangeBetAmount * 3;
                }
                // console.log("34")
            } else {
                // console.log("56")
                winnings -= rangeBetAmount;
            }
        }

        this.balance += winnings;

    }

    reset() {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        this.gameState = GameState.INIT;
        this.balance = 100;
        this.value = randomNumber;
    }

    newRound(){
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        this.gameState = GameState.INIT;
        this.value = randomNumber;
    }
}