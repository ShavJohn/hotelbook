export default {
    data() {
        return {
            dataLang: localStorage.getItem('lang') ? localStorage.getItem('lang') :  'en',
        }
    },
    computed: {
        authUser() {
            return this.$store.getters['auth/authUserGetter']
        },
        imagePrefix() {
            return window.imagePrefix
        },
        headerData() {
            return this.$store.getters['pageSettings/getHeaderData']
        },
        localeLang() {
            return this.$store.getters['generalSettings/getLocale']
        },
        elementEditModalType() {
            return this.$store.getters['pageSettings/getElementEditModalType']
        },
        footerData() {
            return this.$store.getters['pageSettings/getFooterData']
        },
        address() {
            return this.$store.getters['generalSettings/address']
        },
        phone() {
            return this.$store.getters['generalSettings/phone']
        },
        email() {
            return this.$store.getters['generalSettings/email']
        },
        businessHours() {
            return this.$store.getters['generalSettings/businessHours']
        },
    },
    methods: {
        openElementEditModal(modalId, modalType) {
            this.$store.state.pageSettings.elementEditModalType = modalType
            $(modalId).modal("show");
        },
        uploadImage(e) {
            let formData = new FormData()
            formData.append('image', e.target.files[0])


            this.$store.dispatch('imageActions/imageUpload', formData).then((res) => {

                this.$store.state.pageSettings.headerData[this.elementEditModalType] = res.data.image
                this.$store.dispatch('alert/alertResponse', {
                    'type': res?.data?.type,
                    'message': res?.data?.message
                })
            }).catch((err) => {
                this.$store.dispatch('alert/alertResponse', {
                    'type': err?.data?.type,
                    'message': err?.data?.message
                })
            })
        },
        deleteImage(imageName, key, list) {
            this.$store.dispatch('imageActions/imageDelete', imageName).then((res) => {
                if(res.data.success) {
                    this.$store.state.pageSettings.headerData.header_home_background_image = ''

                    this.$store.dispatch('alert/alertResponse', {
                        'type': res?.data?.type,
                        'message': res?.data?.message
                    })
                }
            }).catch((err) => {
                this.$store.dispatch('alert/alertResponse', {
                    'type': err?.data?.type,
                    'message': err?.data?.message
                })
            })
        },
        updateSetting(modalId, ...data) {
            this.$store.dispatch('pageSettings/updatePageSettings', data).then((res) => {
                $(modalId).modal("hide");
                this.$store.dispatch('alert/alertResponse', {
                    'type': res?.data?.type,
                    'message': res?.data?.message
                })
            }).catch((err) => {
                this.$store.dispatch('alert/alertResponse', {
                    'type': err?.data?.type,
                    'message': err?.data?.message
                })
            })
        }
    }
}
