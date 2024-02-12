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
                }).catch((err) => {
                    if(err && err.data) {
                        context.dispatch('alert/alertResponse', {
                            'type': err.data.type,
                            'status': err.status,
                            'message': err.data.message
                        }, { root:true })
                    }
                    reject(err)
                })
            })
        },
        getAuthUser(context, data) {
            return new Promise((resolve, reject) => {
                axios.get('/check-auth').then((res) => {
                    resolve(res)
                }).catch((err) => {
                    if(err && err.data) {
                        context.dispatch('alert/alertResponse', {
                            'type': err.data.type,
                            'status': err.status,
                            'message': err.data.message
                        }, { root:true })
                    }
                    reject(err)
                })
            })
        },
        saveUserChanges(context, data) {
            return new Promise((resolve, reject) => {
                axios.post(`/change-current-user-data/${data.id}`, data).then(res => {
                    resolve(res)
                }).catch(err => {
                    if(err && err.data) {
                        context.dispatch('alert/alertResponse', {
                            'type': err.data.type,
                            'status': err.status,
                            'message': err.data.message
                        }, { root:true })
                    }
                    reject(err)
                })
            })
        },
        createNewUser(context, data) {
            return new Promise((resolve, reject) => {
                axios.post(`/create-user`, data).then(res => {
                    resolve(res)
                }).catch(err => {
                    if(err && err.data) {
                        context.dispatch('alert/alertResponse', {
                            'type': err.data.type,
                            'status': err.status,
                            'message': err.data.message
                        }, { root:true })
                    }
                    reject(err)
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
                    if(err && err.data) {
                        context.dispatch('alert/alertResponse', {
                            'type': err.data.type,
                            'status': err.status,
                            'message': err.data.message
                        }, { root:true })
                    }
                    reject(error)
                })
            })
        }
    }
}
