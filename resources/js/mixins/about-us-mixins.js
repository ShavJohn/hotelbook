export default {
    data() {
        return {
            imagesUploaded: 0,
        }
    },
    computed: {
        topRooms() {
            return this.$store.getters['aboutUs/getTopRooms']
        },
        services() {
            return this.$store.getters['aboutUs/getServices']
        },
        features() {
            return this.$store.getters['aboutUs/getFeatures']
        },
        aboutUsContent() {
            return this.$store.getters['aboutUs/getAboutUsContent']
        }
    },
    methods: {
        getAllData() {
            this.$store.dispatch('aboutUs/getAllData')
        },
        openEditAboutUs() {
            $('#about-us-modal').modal("show");
        },
        updateAboutUsPage(aboutUsContent) {
            this.$store.dispatch('aboutUs/updateAboutUsPage', aboutUsContent)
            $('#about-us-modal').modal("hide");
        },
        uploadAboutUsImage(e) {
            let formData = new FormData()
            formData.append('image', e.target.files[0])


            this.$store.dispatch('imageActions/imageUpload', formData).then((res) => {

                this.$store.commit('aboutUs/setImage', res.data.image)

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
        deleteAboutUsImage(imageName, key, list) {
            this.$store.dispatch('imageActions/imageDelete', imageName).then((res) => {
                if(res.data.success) {

                    this.$store.commit('aboutUs/setImage', '')

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
    }
}
