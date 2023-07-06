// store for game score info

import { writable } from 'svelte/store';

export const score = writable({
    user: 0,
    computer: 0,
    draw: 0
});
export const history = writable([]);
