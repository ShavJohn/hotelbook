export default {
    namespaced: true,
    state: {
        headerData: {
            header_home_background_image: '',
            header_title: {
                en: '',
                ru: ''
            }
        },
        footerData: {
            footerText: {
                en: '',
                ru: ''
            }
        },
        elementEditModalType: 'header-home-edit',
    },
    getters: {
        getHeaderData(state) {
            return state.headerData
        },
        getElementEditModalType(state) {
            return state.elementEditModalType
        },
        getFooterData(state) {
            return state.footerData
        }
    },
    mutations: {
        setHeaderData(state, data) {
            data.forEach(item => {
                if(item.key === 'header_home_background_image') {
                    state.headerData.header_home_background_image = item.value
                } else if(item.key === 'header_title') {
                    state.headerData.header_title.en = item.json_value.en
                    state.headerData.header_title.ru = item.json_value.ru
                }
            })
        },
        setFooterData(state, data) {
            data.forEach(item => {
                if(item.key === 'footerText') {
                    state.footerData.footerText.en = item.json_value.en
                    state.footerData.footerText.ru = item.json_value.ru
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
                    context.commit('setFooterData', res.data.settings)
                    resolve(res)
                }).catch((err) => {

                    reject(err)
                })
            })
        }
    }
}
