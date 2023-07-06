export interface Score {
    user: number;
    computer: number;
    draw: number;
}

const get2DBoard = (board: String[]): String[][] => {
    return board.reduce((result: String[][], _, index: number) => {
        if (index % 3 === 0) {
            result.push(board.slice(index, index + 3));
        }
        return result;
    }, []);


}

export const checkForWinner = (board: String[]): number[] | null => {
    const board2d = get2DBoard(board);

    // check rows
    for (let i = 0; i <= 2; i++) {
        if (
            board2d[i][0] === board2d[i][1] &&
            board2d[i][1] === board2d[i][2] &&
            board2d[i][0] !== ""
        ) {
            return [0 + i * 3, 1 + i * 3, 2 + i * 3];
        }
    }

    // check columns
    for (let i = 0; i <= 2; i++) {
        if (
            board2d[0][i] === board2d[1][i] &&
            board2d[1][i] === board2d[2][i] &&
            board2d[0][i] !== ""
        ) {
            return [0 + i, 3 + i, 6 + i];
        }
    }

    // check diagonals
    if (
        board2d[0][0] === board2d[1][1] &&
        board2d[1][1] === board2d[2][2] &&
        board2d[0][0] !== ""
    ) {
        return [0, 4, 8];
    }

    if (
        board2d[0][2] === board2d[1][1] &&
        board2d[1][1] === board2d[2][0] &&
        board2d[0][2] !== ""
    ) {
        return [2, 4, 6];
    }

    if (board.every((cell) => cell !== "")) {
        return [];
    }

    return null;
};