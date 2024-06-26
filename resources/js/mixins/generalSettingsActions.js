export default {
    data() {
        return {
            optionsTermsAndConditions: {
                placeholder: 'Enter Term and conditions text',
                theme: 'snow'
            },
            optionsBookingConfirmEmail: {
                placeholder: 'Enter Booking Confirm Email text',
                theme: 'snow'
            }
        }
    },
    computed: {
        logo() {
            return this.$store.getters['generalSettings/logo']
        },
        companyName() {
            return this.$store.getters['generalSettings/companyName']
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
        metaTitle() {
            return this.$store.getters['generalSettings/metaTitle']
        },
        metaDesc() {
            return this.$store.getters['generalSettings/metaDesc']
        },
        termsAndConditions() {
            return this.$store.getters['generalSettings/termsAndConditions']
        },
        bookingConfirmEmail() {
            return this.$store.getters['generalSettings/bookingConfirmEmail']
        },
        addressOnMap: {
            get() {
                return this.$store.getters['generalSettings/addressOnMap']
            },
            set(value) {
                this.$store.commit('generalSettings/addressOnMap', value)
            }
        },
        authUser() {
            return this.$store.getters['auth/authUserGetter']
        },
        imagePrefix() {
            return window.imagePrefix
        },
    },
    methods: {
        uploadLogo(e) {
            let formData = new FormData()
            formData.append('image', e.target.files[0])

            this.$store.dispatch('generalSettings/logoUpload', formData).then((res) => {
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
        deleteLogo(imageName) {
            this.$store.dispatch('generalSettings/logoDelete', imageName).then((res) => {
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
        updateGeneralSettings() {
            let data = [
                this.$store.state.generalSettings.companyName,
                this.$store.state.generalSettings.address,
                this.$store.state.generalSettings.phone,
                this.$store.state.generalSettings.email,
                this.$store.state.generalSettings.fax,
                this.$store.state.generalSettings.businessHours,
                this.$store.state.generalSettings.metaTitle,
                this.$store.state.generalSettings.metaDesc,
                this.$store.state.generalSettings.termsAndConditions,
                this.$store.state.generalSettings.bookingConfirmEmail,
                this.addressOnMap
            ]
            this.$store.dispatch('generalSettings/updateGeneralSettings', data).then((res) => {
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
    }
}
