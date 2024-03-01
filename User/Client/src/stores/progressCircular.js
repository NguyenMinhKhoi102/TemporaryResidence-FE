import { defineStore } from 'pinia';

export const usePropressCircular = defineStore({
    id: 'propress-circular',
    state: () => ({
        state: false,
    }),
    actions: {
        setState(state) {
            this.state = state;
        },
    }
})