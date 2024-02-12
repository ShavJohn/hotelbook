export default {
    namespaced: true,
    state: {
        openSideBar: false,
        localeLang: localStorage.getItem('lang') ? localStorage.getItem('lang') :  'en',
        logo: {
            key: 'logo',
            value: ''
        },
        companyName: {
            key: 'companyName',
            value: ''
        },
        address: {
            key: 'address',
            value: ''
        },
        phone: {
            key: 'phone',
            value: ''
        },
        email: {
            key: 'email',
            value: ''
        },
        fax: {
            key: 'fax',
            value: ''
        },
        businessHours: {
            key: 'businessHours',
            value: ''
        },
        metaTitle: {
            key: 'metaTitle',
            value: ''
        },
        metaDesc: {
            key: 'metaDesc',
            value: '',
        },
    },
    getters: {
        openSideBar(state) {
            return state.openSideBar
        },
        getLocale(state) {
            return state.localeLang
        },
        logo(state) {
            return state.logo
        },
        companyName(state) {
            return state.companyName
        },
        address(state) {
            return state.address
        },
        phone(state) {
            return state.phone
        },
        email(state) {
            return state.email
        },
        businessHours(state) {
            return state.businessHours
        },
        metaTitle(state) {
            return state.metaTitle
        },
        metaDesc(state) {
            return state.metaDesc
        }
    },
    mutations: {
        logoSetter(state, data) {
            state.logo.value = data.logo ? data.logo : ''
        },
        companyNameSetter(state, data) {
            state.companyName.value = data.companyName ? data.companyName : ''
        },
        addressSetter(state, data) {
            state.address.value = data.address ? data.address : ''
        },
        phoneSetter(state, data) {
            state.phone.value = data.phone ? data.phone : ''
        },
        emailSetter(state, data) {
            state.email.value = data.email ? data.email : ''
        },
        businessHoursSetter(state, data) {
            state.businessHours.value = data.businessHours ? data.businessHours : ''
        },
        metaTitleSetter(state, data) {
            state.metaTitle.value = data.metaTitle ? data.metaTitle : ''
        },
        metaDescSetter(state, data) {
            state.metaDesc.value = data.metaDesc ? data.metaDesc : ''
        }
    },
    actions: {
        logoUpload(context, data) {
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }
            return new Promise((resolve, reject) => {
                axios.post('/upload-logo', data, config).then((res) => {
                    context.commit('logoSetter', res.data)
                    resolve(res)
                }).catch((err) => {

                    reject(err)
                })
            })
        },
        logoDelete(context, data) {
            return new Promise((resolve, reject) => {

                const dotIndex = data.lastIndexOf('.');
                let imageName = data.substring(0, dotIndex);

                axios.delete(`/delete-logo/${imageName}`).then((res) => {
                    context.state.logo.value = ''
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
        updateGeneralSettings(context, data) {
            return new Promise((resolve, reject) => {
                axios.post(`/update-general-settings`, data).then((res) => {
                    context.dispatch('getGeneralSettings')
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
        getGeneralSettings(context, data) {
            return new Promise((resolve, reject) => {
                axios.get(`/get-general-settings`).then((res) => {
                    context.commit('logoSetter', res.data.setting)
                    context.commit('companyNameSetter', res.data.setting)
                    context.commit('addressSetter', res.data.setting)
                    context.commit('phoneSetter', res.data.setting)
                    context.commit('emailSetter', res.data.setting)
                    context.commit('businessHoursSetter', res.data.setting)
                    context.commit('metaTitleSetter', res.data.setting)
                    context.commit('metaDescSetter', res.data.setting)
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
