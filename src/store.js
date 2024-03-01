import { createStore } from 'vuex';

export default createStore({
    state: {
        prefectureId: 0,
        prefectureName: ''
    },
    mutations: {
        updatePrefectureId(state, newId) {
            state.prefectureId = newId;
        },
        updatePrefectureName(state, newName) {
            state.prefectureName = newName;
        }
    }
});
