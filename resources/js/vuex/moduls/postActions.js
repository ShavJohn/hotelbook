export default {
    namespaced: true,
    state: {
        postsModalType: '',
        postData: {
            image_path: '',
            title: {
                en: '',
                ru: ''
            },
            body: {
                en: '',
                ru: ''
            }
        },
        posts: [],
    },
    getters: {
        getPostsModalType(state) {
            return state.postsModalType
        },
        getPostData(state) {
            return state.postData
        },
        getPosts(state) {
            return state.posts
        }
    },
    mutations: {
        setPostsModalType(state, data) {
            state.postsModalType = data
        },
        setPostData(state, data) {
            state.postData.image_path = data.image_path
            state.postData.title.en = data.title.en
            state.postData.title.ru = data.title.ru
            state.postData.body.en = data.text.en
            state.postData.body.ru = data.text.ru
        },
        setPostImage(state, data) {
            state.postData.image_path = data
        },
        setPosts(state, data) {
            state.posts = data
        }
    },
    actions: {
        createPost(context, data) {
            return new Promise((resolve, reject) => {
                axios.post('/create-post', data).then((res) =>{
                    context.dispatch('alert/alertResponse', {
                        'type': res.data.type,
                        'status': res.status,
                        'message': res.data.message
                    }, { root:true })
                    resolve(res)
                }).catch((err) => {
                    context.dispatch('alert/alertResponse', {
                        'type': err.data.type,
                        'status': err.status,
                        'message': err.data.message
                    }, { root:true })
                    reject(err)
                })
            })
        }
    }
}
