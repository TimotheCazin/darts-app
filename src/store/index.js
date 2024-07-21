import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    players: [],
    limit_x01 : "301",
    cricket_closings : [],
    cricket_points : [],
    cricket_last_darts : [],
    cricket_history : [],
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    initializeCricket({state}){
      state.cricket_closings = new Array(7).fill(0).map(() => new Array(state.players.length).fill(0))
      state.cricket_points = new Array(state.players.length).fill(0)
      state.cricket_last_darts = []
      state.cricket_history = []
    }
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
