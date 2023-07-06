export default class Player {
    type: string;

    constructor(type: string) {
        this.type = type;
    }

    getType(): string {
        return this.type;
    }

    getNextMove(board: String[]): number {
        return Math.floor(Math.random() * 9);
    }
}