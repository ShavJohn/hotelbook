export default {
    namespaced: true,
    state: {
        openSideBar: false,
        localeLang: localStorage.getItem('lang') ? localStorage.getItem('lang') :  'ru',
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
        addressOnMap: {
            key: 'addressOnMap',
            value: ''
        },
        termsAndConditions: {
            key: 'termsAndConditions',
            value: '',
            json_value: {
                en: '',
                ru: '',
                termsAdnConditionsSwitch: false
            }
        },
        bookingConfirmEmail: {
            key: 'bookingConfirmEmail',
            value: '',
            json_value: {
                en: '',
                ru: '',
            }
        },
        priceListIntervals: {
            key: 'priceListIntervals',
            value: '',
            json_value: []
        }
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
        },
        termsAndConditions(state) {
            return state.termsAndConditions
        },
        bookingConfirmEmail(state) {
            return state.bookingConfirmEmail
        },
        addressOnMap(state) {
            return state.addressOnMap
        },
        priceListIntervals(state) {
            return state.priceListIntervals
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
        },
        termsAndConditions(state, data) {
            if(data.termsAndConditions) {
                state.termsAndConditions.json_value.en = data.termsAndConditions.en ? data.termsAndConditions.en : ''
                state.termsAndConditions.json_value.ru = data.termsAndConditions.ru ? data.termsAndConditions.ru : ''
                state.termsAndConditions.json_value.termsAdnConditionsSwitch = data.termsAndConditions.termsAdnConditionsSwitch ? data.termsAndConditions.termsAdnConditionsSwitch : false
            }
        },
        bookingConfirmEmail(state, data) {
            if(data.bookingConfirmEmail) {
                state.bookingConfirmEmail.json_value.en = data.bookingConfirmEmail.en ? data.bookingConfirmEmail.en : ''
                state.bookingConfirmEmail.json_value.ru = data.bookingConfirmEmail.ru ? data.bookingConfirmEmail.ru : ''
            }
        },
        addressOnMap(state, data) {
            state.addressOnMap.value = data ? data : ''
        },
        pushPriceListIntervals(state, data) {
            state.priceListIntervals.json_value.push(data)
        },
        priceListIntervals(state, data) {
            state.priceListIntervals.json_value = data
        },
        removeInterval(state, key) {
            state.priceListIntervals.json_value.splice(key, 1)
        }
    },
    actions: {
        logoUpload(context, data) {
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }
            return new Promise((resolve, reject) => {
                axios.post('/upload-logo', data, config).then((res) => {
                   if(res && res.data) {
                       context.commit('logoSetter', res.data)
                   }
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
                    if(res.data.success) {
                        context.dispatch('alert/alertResponse', {
                            'type': res.data.type,
                            'status': res.status,
                            'message': res.data.message
                        }, { root:true })
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
        getGeneralSettings(context, data) {
            return new Promise((resolve, reject) => {
                axios.get(`/get-general-settings`).then((res) => {
                    if(res && res.data && res.data.settings) {
                        context.commit('logoSetter', res.data.settings)
                        context.commit('companyNameSetter', res.data.settings)
                        context.commit('addressSetter', res.data.settings)
                        context.commit('phoneSetter', res.data.settings)
                        context.commit('emailSetter', res.data.settings)
                        context.commit('businessHoursSetter', res.data.settings)
                        context.commit('metaTitleSetter', res.data.settings)
                        context.commit('metaDescSetter', res.data.settings)
                        context.commit('termsAndConditions', res.data.settings)
                        context.commit('bookingConfirmEmail', res.data.settings)
                        context.commit('addressOnMap', res.data.settings.addressOnMap)
                        context.commit('priceListIntervals', res.data.settings.priceListIntervals)
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
