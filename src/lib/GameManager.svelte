<script lang="ts">
    import GameGrid from "./GameGrid.svelte";
    import Player from "../player";
    import { score, history } from "./scoreStore.js";
    import { onMount } from "svelte";

    export let clickingPlayer: String;
    const enemy = new Player(clickingPlayer === "X" ? "O" : "X");

    let isUsersRound = true;
    let board = new Array(9).fill("");
    let winningSequence = null;
    let handleMove: (cellIndex: number, currentPlayer: String) => Boolean;

    const computerMove = () => {
        let value = enemy.getNextMove(board);
        while (!handleMove(value, enemy.getType())) {
            value = enemy.getNextMove(board);
        }
    };

    const checkForWinner = (): Number[] => {
        const board2d = board.reduce((result, _, index) => {
            if (index % 3 === 0) {
                result.push(board.slice(index, index + 3));
            }
            return result;
        }, []);

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

    interface Score {
        user: number;
        computer: number;
        draw: number;
    }

    interface History {
        player: String;
        index: number;
    }

    const updateScore = (prev: Score) => {
        // draw game because winningSequence is []
        if (winningSequence.length === 0) {
            return { ...prev, draw: prev.draw + 1 };
        }
        // user won
        else if (board[winningSequence[0]] === clickingPlayer) {
            return { ...prev, user: prev.user + 1 };
        }
        // computer won
        else {
            return { ...prev, computer: prev.computer + 1 };
        }
    };

    const onMove = () => {
        winningSequence = checkForWinner();
        isUsersRound = winningSequence ? false : true;

        // if user did not win trigger the computer move and check for winner again
        if (!winningSequence) {
            computerMove();
            winningSequence = checkForWinner();
            isUsersRound = winningSequence ? false : true;
        }

        // if there is a winner update the score
        if (winningSequence) {
            score.update(updateScore);
        }
    };

    const resetGame = () => {
        board.fill("");
        board = board;

        winningSequence = null;
        isUsersRound = true;

        // reset history
        history.set([]);
    };

    onMount(() => {
        if (enemy.getType() === "X") {
            computerMove();
            isUsersRound = true;
        }
    });
</script>

<div class="game-field">
    <div class="btns">
        <a href="/" class="back-btn" rel="noreferrer">&#8592;</a>
        <button class="new-game-btn" on:click={resetGame}>New game</button>
    </div>

    <GameGrid
        bind:handleMove
        {board}
        {clickingPlayer}
        bind:isClickable={isUsersRound}
        bind:winningSequence
        on:move={onMove}
    />
</div>


<style>
    /* make this bigger and nice looking */
    .new-game-btn {
        margin: 10px;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid #555;
        background-color: #555;
        cursor: pointer;
        color: white;
        opacity: 0.5;
    }

    /* make this visible */
    .back-btn {
        margin: 10px;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid #555;
        /* make it nicer color */
        background-color: #555;
        opacity: 0.5;

        color: white;
        cursor: pointer;

        text-decoration: none;
        font-weight: bold;
    }

    /* center all items */
    .game-field {
        display: flex;
        flex-direction: column;
        align-items: center;

        /* limit the width to the center */
        width: 400px;
        margin: 0 auto;
    }

    /* place them one on the left and one of right center */
    .btns {
        display: flex;
        justify-content: space-between;
        width: 75%;

        /* make them bigger */
        font-size: 1.2rem;
    }

</style>