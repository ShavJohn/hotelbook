export default {
    namespaced: true,
    state: {
        postsModalType: '',
        postData: {
            id: '',
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
            state.postData.id = data.id
            state.postData.image_path = data.image_path
            state.postData.title.en = data.title.en
            state.postData.title.ru = data.title.ru
            state.postData.body.en = data.body.en
            state.postData.body.ru = data.body.ru
        },
        setPostImage(state, data) {
            state.postData.image_path = data
        },
        setPosts(state, data) {
            state.posts = data
        },
        removePost(state, data) {
            state.posts.splice(data, 1)
        }
    },
    actions: {
        createPost(context, data) {
            return new Promise((resolve, reject) => {
                axios.post('/create-post', data).then((res) =>{
                    context.dispatch('getAllPosts')
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
        },
        getAllPosts(context, data) {
            return new Promise((resolve, reject) => {
                axios.get('/get-posts').then((res) => {
                    context.commit('setPosts', res.data.posts)
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
        },
        editPost(context, data) {
            return new Promise((resolve, reject) => {
                axios.put('/update-post', data).then(res => {
                    context.dispatch('getAllPosts')
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
        },
        deletePost(context, data) {
            return new Promise((resolve, reject) => {
                axios.delete(`/delete-post/${data}`).then(res => {
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
