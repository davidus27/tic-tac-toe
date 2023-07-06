abstract class Player {
    type: string;

    constructor(type: string) {
        this.type = type;
    }

    getType(): string {
        return this.type;
    }

    abstract getNextMove(board: String[]): number 
}


export class RandomPlayer extends Player {

    getNextMove(board: String[]): number {
        let possibleMove = Math.floor(Math.random() * 9);
        while(board[possibleMove] !== "") {
            possibleMove = Math.floor(Math.random() * 9)
        }
        return possibleMove;
    }
}


export class MinMaxPlayer extends Player {
    payoff: number;

    getNextMove(board: String[]): number {
        return Math.floor(Math.random() * 9);
    }
}

