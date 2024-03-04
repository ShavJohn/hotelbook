export default {
    namespaced: true,
    state: {
        headerData: {
            header_home_background_image: '',
            header_rooms_background_image: '',
            header_contact_background_image: '',
            header_about_background_image: '',
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
                    state.headerData.header_home_background_image = item.value ? item.value : ''
                } else  if(item.key === 'header_rooms_background_image') {
                    state.headerData.header_rooms_background_image = item.value ? item.value : ''
                } else  if(item.key === 'header_contact_background_image') {
                    state.headerData.header_contact_background_image = item.value ? item.value : ''
                } else  if(item.key === 'header_about_background_image') {
                    state.headerData.header_about_background_image = item.value ? item.value : ''
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
                    if(err && err.data) {
                        context.dispatch('alert/alertResponse', {
                            'type': err.data.type,
                            'status': err.status,
                            'message': err.data.message
                        }, { root:true })
                    }
                })
            })
        },
        getPageSettings(context, data) {
            return new Promise((resolve, reject) => {
                axios.get(`/get-page-settings`).then((res) => {
                    if(res && res.data) {
                        context.commit('setHeaderData', res.data.settings)
                        context.commit('setFooterData', res.data.settings)
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
        }
    }
}
