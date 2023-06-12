export default {
    namespaced: true,
    state: {
        accessToken: localStorage.getItem('access_token'),
        authUser: JSON.parse(localStorage.getItem('auth_user'))
    },
    getters: {
        accessTokenGetter(state) {
            return state.accessToken
        },
        authUserGetter(state) {
            return state.authUser
        }
    },
    mutations: {
        accessTokenSetter(state, data) {
            state.accessToken = data
        },
        authUserSetter(state, data) {
            state.authUser = data
        }
    },
    actions: {
        login(context, data) {
            return new Promise((resolve, reject) => {
                axios.post('/login', data).then(res => {
                    if(res.data.success) {
                        localStorage.setItem('access_token', res.data.token)
                        localStorage.setItem('auth_user', JSON.stringify(res.data.authUser))
                        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

                        context.commit('accessTokenSetter', res.data.token)
                        context.commit('authUserSetter', res.data.authUser)
                    }
                    resolve(res)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        getAuthUser(context, data) {
            return new Promise((resolve, reject) => {
                axios.get('/check-auth').then((res) => {
                    resolve(res)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        saveUserChanges(context, data) {
            return new Promise((resolve, reject) => {
                axios.post(`/change-current-user-data/${data.id}`, data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject.error
                })
            })
        },
        createNewUser(context, data) {
            return new Promise((resolve, reject) => {
                axios.post(`/create-user`, data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject.error
                })
            })
        },
        logOut(context, data) {
            return new Promise((resolve, reject) => {
                axios.post('/logout').then((res) => {
                    if(res.data.success) {
                        context.commit('accessTokenSetter', '')
                        context.commit('authUserSetter', '')
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('auth_user')
                    }
                    resolve(res)
                }).catch((error) => {
                    reject(error)
                })
            })
        }
    }
}
