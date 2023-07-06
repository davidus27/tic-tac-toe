<script lang="ts">
    export let value: String;
    export let selected: Boolean; // button was selected and is no longer usable
    export let isClickable: Boolean; // button is temporarily not clickable

    // $: selected = value !== "";


</script>

<button
    on:click
    class="button {selected ? 'selected' : ''} {isClickable ? '' : 'clickable'}"
>
    {value}
</button>

<style>
    .button {
        width: 100px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        cursor: pointer;
        transition: transform 0.3s;
        perspective: 1000px;
        /* background-color: #f1f1f1; */
        border: 2px solid #ccc;
        border-radius: 5px;

        /* add them corners and color */
        border-radius: 10px;
        background-color: #e8e8e8;
        margin: 10px;

        /* make them look like they are pressed when clicked */
        box-shadow: 2px 2px #666;

        user-select: none;
    }

    .button:hover {
        border: 1px solid #d8d8d8;
        /* make buttons look like they are pressed when clicked */
        box-shadow: 1px 2px #666;

        /* change color to be more visible */
        color: #333;
    }

    .button.selected {
        /* nice unique color for winning  */
        background-color: #d6a5a5;
        opacity: 1 !important;
    }

    .button:hover {
        transform: rotateY(180deg) scale(0.9);
    }

    .clickable {
        /* make the button not clickable */
        pointer-events: none;
        opacity: 0.5;
    }
</style>
