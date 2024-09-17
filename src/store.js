import {createStore} from "vuex";
import axios from "axios";

const store = createStore(
    {
        state: {
            data: null,
            loading: false,
        },
        mutations: {
            setData(state, payload) {
                state.data = payload;
            },
            setLoading(state, payload) {
                state.loading = payload;
            },
        },
        actions: {
            async fetchData({ commit }) {
                commit('setLoading', true);
                try {
                    axios.get('http://127.0.0.1:9000/data')
                        .then(response => {
                            commit('setData', response.data[0]);
                            console.log(response.data[0]);
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                } catch (error) {
                    console.error('Ошибка при загрузке данных:', error);
                } finally {
                    commit('setLoading', false);
                }
            },
        },
    }
);

export default store;