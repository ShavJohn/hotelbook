export default {
    data() {
        return {
            imagesUploaded: 0
        }
    },
    computed: {
        postsModalType() {
            return this.$store.getters['postActions/getPostsModalType']
        },
        postData() {
            return this.$store.getters['postActions/getPostData']
        }
    },
    methods: {
        openModal(modalId, type) {
            this.$store.commit('postActions/setPostsModalType', type)
            $(modalId).modal("show");
        },
        uploadPostImage(e) {
            let formData = new FormData()
            formData.append('image', e.target.files[0])


            this.$store.dispatch('imageActions/imageUpload', formData).then((res) => {

                console.log(res.data.image, this.postData)
                this.$store.commit('postActions/setPostImage', res.data.image)

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
        deletePostImage(imageName, key, list) {
            this.$store.dispatch('imageActions/imageDelete', imageName).then((res) => {
                if(res.data.success) {
                    this.$store.commit('postActions/setPostImage', '')

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
        createPost() {
            this.$store.dispatch('postActions/createPost', this.postData).then(() => {
                $('#post-actions-modal').modal("hide");
            })
        }
    }
}
