export default {
    namespaced: true,
    state: {
        topRooms: [],
        services: [],
        features: [],
        aboutUsContent: {
            en: {
                title: '',
                content: '',
                yearsOfExp: '',
            },
            ru: {
                title: '',
                content: '',
                yearsOfExp: '',
            },
            image: '',
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
            if(data.aboutUsContent && data.aboutUsContent.json_value) {
                state.aboutUsContent.en.title = data.aboutUsContent.json_value.en.title ? data.aboutUsContent.json_value.en.title : ''
                state.aboutUsContent.ru.title = data.aboutUsContent.json_value.ru.title ? data.aboutUsContent.json_value.ru.title : ''
                state.aboutUsContent.en.content = data.aboutUsContent.json_value.en.content ? data.aboutUsContent.json_value.en.content : ''
                state.aboutUsContent.ru.content = data.aboutUsContent.json_value.ru.content ? data.aboutUsContent.json_value.ru.content : ''
                state.aboutUsContent.en.yearsOfExp = data.aboutUsContent.json_value.en.yearsOfExp ? data.aboutUsContent.json_value.en.yearsOfExp : ''
                state.aboutUsContent.ru.yearsOfExp = data.aboutUsContent.json_value.ru.yearsOfExp ? data.aboutUsContent.json_value.ru.yearsOfExp : ''
                state.aboutUsContent.image = data.aboutUsContent.value ? data.aboutUsContent.value : ''
            }
        },
        setImage(state, data) {
            state.aboutUsContent.image = data
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
        updateAboutUsPage(context, data) {
            return new Promise((resolve, reject) => {
                axios.post('/update-about-us-page', data).then(res => {

                    context.dispatch('alert/alertResponse', {
                        'type': res.data.type,
                        'status': res.status,
                        'message': res.data.message
                    }, { root:true })
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
        }
    }
}
