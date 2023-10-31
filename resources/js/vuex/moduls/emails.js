export default {
    namespaced: true,
    state: {
        contactUsMessages: []
    },
    getters: {
        contactUsMessagesGetter(state) {
            return state.contactUsMessages
        }
    },
    mutations: {
        contactUsMessagesSetter(state, data) {
            state.contactUsMessages = data
        }
    },
    actions: {
        sendMessage(context, data) {
            return new Promise((resolve, reject) => {
                axios.post('/send-message', data).then((res) => {
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        getContactMessages(context, data) {
            return new Promise((resolve, reject) => {
                axios.get('/get-messages', {
                    params: {
                        skip: data.skip,
                        take: data.take
                    }
                }).then(res => {
                    context.commit('contactUsMessagesSetter', res.data.messages)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        replyToMessage(context, data) {
            return new Promise((resolve, reject) => {
                console.log(data)
                axios.post('/reply-to-message', data).then((res) => {
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
            })
        }
    }
}
