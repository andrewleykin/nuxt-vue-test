export const state = () => ({
  result: [],
  info: [
    {
      id: 0,
      text: 'это не правильный текст'
    },
    {
      id: 1,
      text: 'это тот самый текст из другого json'
    }
  ]
})

export const getters = {
  result: s => s.result,
  info: s => s.info
}

export const mutations = {
  setResult(state, value) {
    state.result = value
  }
}

export const actions = {
  async fetch({commit}) {
    const result = await this.$axios.$get('https://smmtouch.dev.konekon.ru:8443/api/services')
    commit('setResult', result)
  }
}