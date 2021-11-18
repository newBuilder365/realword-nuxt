const cookieparser = process.server ? require('cookieparser') : undefined

const state = () => {
  return {
    //当前用户的登录信息
    user: null
  }
}

const mutations = {
  setUser (state, data) {
    state.user = data
  }
}

const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let user = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setUser', user)
  }
}

export {
  state,
  mutations,
  actions
}