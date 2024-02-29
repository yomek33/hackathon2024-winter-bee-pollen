// import { createStore } from 'vuex';

// export default createStore({
//     state: {
//         prefectureId: 0
//     },
//     mutations: {
//         updatePrefectureId(state, newId) {
//             state.prefectureId = newId;
//         }
//     }
// });

// store.js
import { reactive } from 'vue'

export const prefecture = reactive({
    id: 0,
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
