<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
</script>

<div id="selection">
    <h1>Let's play TIC-TAC-TOE!</h1>
    <h2>Choose your side</h2>
    <button
        on:click={() => {
            dispatch('select', {
            text: 'X'
        });
        }}
        type="button"
        class="select-button"
        >X
        <span class="tooltip">You start first in the game</span>
    </button>
    <button
        on:click={() => {
            dispatch('select', {
            text: 'O'
        });
        }}
        type="button"
        class="select-button"
        >O
        <span class="tooltip">You start second in the game</span>
    </button>
</div>
