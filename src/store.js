// store.js
import { reactive } from 'vue'

export const prefecture = reactive({
    id: 0,
    name: '',
    getid() {
        return this.id
    },
    setid(newid) {
        this.id = newid
    }
});

export const job = reactive({
    id: 0,
    getid() {
        return this.id
    },
    setid(newid) {
        this.id = newid

    }
});
