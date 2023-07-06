<script lang="ts">
    import Button from "./Button.svelte";

    import { createEventDispatcher } from "svelte";
    import { history } from "./scoreStore.js";

    const dispatch = createEventDispatcher();

    // makes a 3x3 array
    // defines a interaction with the board

    export let board: String[];
    export let isClickable: Boolean;
    export let clickingPlayer: String;
    export let winningSequence: Number[];

    const addHistory = (player: String, index: number) => {
        // add move to history
        history.update((prev: any) => {
            console.log("History updated");
            return [
                ...prev,
                {
                    player,
                    index,
                },
            ];
        });
    };

    // function to handle the move
    export const handleMove = (
        cellIndex: number,
        currentPlayer: String
    ): Boolean => {
        // check if the cell is empty
        if (board[cellIndex] === "") {
            // update the board
            board[cellIndex] = currentPlayer;

            addHistory(currentPlayer, cellIndex);
            return true;
        }
        return false;
    };
</script>

<div class="game">
    {#each board as value, index}
        <Button
            {value}
            {isClickable}
            selected={winningSequence?.includes(index)}
            on:click={() => {
                if (!isClickable) return;
                if (handleMove(index, clickingPlayer)) dispatch("move");
            }}
        />
    {/each}
</div>

<style>
    /* make the grid 3x3 so the button elements will be split with small gap */
    .game {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 0.5em;
        max-width: 330px;
    }
</style>
