<script lang="ts">
    import { score, history } from "./scoreStore.js";
</script>

<div id="gameinfo">
    <div id="score">
        <h2>Current score</h2>
        <h3>User: <span id="player-x-score">{$score.user}</span></h3>
        <h3>PC: <span id="player-o-score">{$score.computer}</span></h3>
        <h3>Draw: <span id="draw-score">{$score.draw}</span></h3>
    </div>

    <div id="history">
        <h2>History</h2>
        {#each $history as { player, index }, i}
            <div class="history-item">
                Player {player} selected {index}
            </div>
        {/each}
    </div>
</div>

<style>
    /* make this to be a nice loking element of the list */
    .history-item {
        margin: 0.5rem;
        padding: 0.5rem;
        border: 1px solid black;
        border-radius: 0.5rem;

        /* add color */
        background-color: #f0f0f0;

        /* add border with rounded edges */
        border: 1px solid #d0d0d0;
        border-radius: 0.5rem;

        /* add shadow */
        box-shadow: 0 0 0.5rem #d0d0d0;

        /* make it narrow */
        width: 10rem;

        /* center it */
        margin: 0 auto;
    }
</style>
