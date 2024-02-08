export default {
    namespaced: true,
    state: {
        topRooms: [],
        services: [],
        features: [],
        aboutUsContent: {
            title: '',
            content: '',
            yearsOfExp: ''
        }
    },
    getters: {
        getTopRooms(state) {
            return state.topRooms
        },
        getServices(state) {
            return state.services
        },
        getFeatures(state) {
            return state.features
        },
        getAboutUsContent(state) {
            return state.aboutUsContent
        }
    },
    mutations: {
        setTopRooms(state, data) {
            state.topRooms = data.topRooms
        },
        setServices(state, data) {
            state.services = data.services
        },
        setFeatures(state, data) {
            state.features = data.features
        },
        setAboutUsContent(state, data) {
            state.aboutUsContent.title = data.aboutUsContent.title ? data.aboutUsContent.title : ''
            state.aboutUsContent.content = data.aboutUsContent.content ? data.aboutUsContent.content : ''
            state.aboutUsContent.yearsOfExp = data.aboutUsContent.yearsOfExp ? data.aboutUsContent.yearsOfExp : ''
        }
    },
    actions: {
        getAllData(context, data) {
            return new Promise((resolve, reject) => {
                axios.get('/get-about-us-data').then(res => {
                    context.commit('setTopRooms', res.data)
                    context.commit('setServices', res.data)
                    context.commit('setFeatures', res.data)
                    context.commit('setAboutUsContent', res.data)

                    resolve(res)
                }).catch(err => {
                    context.dispatch('alert/alertResponse', {
                        'type': err.data.type,
                        'status': err.status,
                        'message': err.data.message
                    }, { root:true })
                    reject(err)
                })
            })
        }
    }
}
