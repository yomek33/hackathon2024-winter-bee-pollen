import { createStore } from 'vuex';

export default createStore({
    state: {
        prefectureId: 0
    },
    mutations: {
        updatePrefectureId(state, newId) {
            state.prefectureId = newId;
        }
    }
});
