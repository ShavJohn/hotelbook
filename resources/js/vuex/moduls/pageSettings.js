export default {
    namespaced: true,
    state: {
        headerData: {
            header_background_image: '',
            header_title: {
                en: '',
                ru: ''
            }
        }
    },
    getters: {
        getHeaderData(state) {
            return state.headerData
        }
    },
    mutations: {
        setHeaderData(state, data) {
            data.forEach(item => {
                if(item.key === 'header_background_image') {
                    state.headerData.header_background_image = item.value
                } else if(item.key === 'header_title') {
                    state.headerData.header_title.en = item.json_value.en
                    state.headerData.header_title.ru = item.json_value.ru
                }
            })
        }
    },
    actions: {
        updatePageSettings(context, data) {
            return new Promise((resolve, reject) => {
                axios.post(`/update-page-settings`, data).then((res) => {
                    context.dispatch('getPageSettings')
                    resolve(res)
                }).catch((err) => {

                    reject(err)
                })
            })
        },
        getPageSettings(context, data) {
            return new Promise((resolve, reject) => {
                axios.get(`/get-page-settings`).then((res) => {
                    context.commit('setHeaderData', res.data.settings)
                    resolve(res)
                }).catch((err) => {

                    reject(err)
                })
            })
        }
    }
}
