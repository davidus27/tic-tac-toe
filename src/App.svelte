<script lang="ts">
  import svelteLogo from './assets/favicon.ico'
    import GameInfo from './lib/GameInfo.svelte';
  import GameManager from './lib/GameManager.svelte';
    import Selection from './lib/Selection.svelte';

  let pickedSide = null;


</script>

<main>
  <div>
    <a href="/" rel="noreferrer">
      <!-- invert colors of the img -->
      <img src={svelteLogo} class="logo" alt="Home" style="filter:invert(100%)" />
    </a>
  </div>

  <div class="card">
    {#if pickedSide}
      <GameManager clickingPlayer={pickedSide} />
      <GameInfo 
        
      />
    {:else}
      <Selection on:select={(e) => { pickedSide = e.detail.text; }} />
      <p class="read-the-docs">
        Click on one of the cards to play the game.
      </p>
    {/if}
  </div>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa) !important;
  }
  .read-the-docs {
    color: #888;
  }
</style>
