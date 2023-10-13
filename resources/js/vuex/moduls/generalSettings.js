export default {
    namespaced: true,
    state: {
        openSideBar: false,
        pages: [
            {
                name: 'Home',
                dropDown: false,
                route: 'Home',
                id: 1,
                show: true
            },
            {
                name: 'Services',
                dropDown: true,
                route: 'Services',
                id: 2,
                show: true
            },
            // {
            //     name: 'Projects',
            //     dropDown: true,
            //     route: 'Projects',
            //     id: 3,
            //     show: true
            // },
            // {
            //     name: 'About',
            //     dropDown: false,
            //     route: 'About',
            //     id: 4,
            //     show: true
            // },
            // {
            //     name: 'Blog',
            //     dropDown: false,
            //     route: 'Blog',
            //     id: 5,
            //     show: true
            // },
            {
                name: 'Contact',
                dropDown: false,
                route: 'Contact',
                id: 6,
                show: true
            },
        ],
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
        }
    },
    getters: {
        openSideBar(state) {
            return state.openSideBar
        },
        pages(state) {
            return state.pages
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
        fax(state) {
            return state.fax
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
            console.log(data)
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
        faxSetter(state, data) {
            state.fax.value = data.fax ? data.fax : ''
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
                axios.delete(`/delete-logo/${data}`).then((res) => {
                    context.state.logo.value = ''
                    resolve(res)
                }).catch((err) => {

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

                    reject(err)
                })
            })
        },
        getGeneralSettings(context, data) {
            return new Promise((resolve, reject) => {
                axios.get(`/get-general-settings`).then((res) => {
                    console.log(res.data)
                    context.commit('logoSetter', res.data.setting)
                    context.commit('companyNameSetter', res.data.setting)
                    context.commit('addressSetter', res.data.setting)
                    context.commit('phoneSetter', res.data.setting)
                    context.commit('emailSetter', res.data.setting)
                    context.commit('faxSetter', res.data.setting)
                    context.commit('businessHoursSetter', res.data.setting)
                    context.commit('metaTitleSetter', res.data.setting)
                    context.commit('metaDescSetter', res.data.setting)
                    resolve(res)
                }).catch((err) => {

                    reject(err)
                })
            })
        }
    }
}
