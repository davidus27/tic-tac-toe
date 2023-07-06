<script lang="ts">
    import GameGrid from "./GameGrid.svelte";
    import { score, history } from "./scoreStore.js";
    import { onMount } from "svelte";
    import { RandomPlayer, MinMaxPlayer } from "../player";
    import { checkForWinner, type Score } from "../gameUtils";

    export let clickingPlayer: String;
    const enemy = new RandomPlayer(clickingPlayer === "X" ? "O" : "X");

    let isUsersRound = true;
    let board = new Array(9).fill("");
    let winningSequence = null;
    let handleMove: (cellIndex: number, currentPlayer: String) => Boolean;

    const computerMove = () => {
        handleMove(enemy.getNextMove(board), enemy.getType());
    };

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
        winningSequence = checkForWinner(board);
        isUsersRound = winningSequence ? false : true;

        // if user did not win trigger the computer move and check for winner again
        if (!winningSequence) {
            computerMove();
            winningSequence = checkForWinner(board);
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