export default {
    namespaced: true,
    state: {
        contactUsMessages: [],
        selectedMessage: {},
        displayTab: ''
    },
    getters: {
        contactUsMessagesGetter(state) {
            return state.contactUsMessages
        },
        getSelectedMessage(state) {
            return state.selectedMessage
        },
        getDisplayTab(state) {
            return state.displayTab
        }
    },
    mutations: {
        contactUsMessagesSetter(state, data) {
            state.contactUsMessages = data
        },
        setSelectedMessage(state, data) {
            state.selectedMessage = data
        },
        setDisplayType(state, data) {
            state.displayTab = data
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
