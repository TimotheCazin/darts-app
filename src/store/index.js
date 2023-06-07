import { createStore } from 'vuex'

export default createStore({
  state: {
    players: [],
    limit_x01 : "301",
    cricket_closings : new Array(7).fill(0).map(() => new Array(4).fill(0)),
    cricket_points : new Array(4).fill(0),
    cricket_history : [],
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
