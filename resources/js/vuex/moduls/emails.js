import {reject} from "lodash/collection";

export default {
    namespaced: true,
    state: {
        contactUsMessages: [],
        selectedMessage: {},
        displayTab: '',
        currentKey: 0,
        dataFinished: false,
        unreadEmails: 0,
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
        },
        getCurrentKey(state) {
            return state.currentKey
        },
        getDataFinished(state) {
            return state.dataFinished
        },
        getUnreadEmails(state) {
            return state.unreadEmails
        }
    },
    mutations: {
        contactUsMessagesSetter(state, data) {
            state.contactUsMessages.push(...data)
        },
        setSelectedMessage(state, data) {
            state.selectedMessage = data
        },
        setDisplayType(state, data) {
            state.displayTab = data
        },
        setCurrentKey(state, data) {
            state.currentKey = data
        },
        updateEmailData(state, data) {
            state.contactUsMessages[state.currentKey].reply = data
        },
        setDataFinished(state, data) {
            state.dataFinished = data
        },
        setUnreadEmails(state, data) {
            state.unreadEmails = data.unreadEmails
        },
        markMessageAsRead(state, data) {
            state.contactUsMessages[data].read = true;
            --state.unreadEmails
        }
    },
    actions: {
        sendMessage(context, data) {
            return new Promise((resolve, reject) => {
                axios.post('/send-message', data).then((res) => {
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
        updateEmailStatus(context, data) {
            return new Promise((resolve, reject) => {
                axios.put(`/update-message-status/${data.id}`).then(res => {
                    context.commit('markMessageAsRead', data.key)
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
        getContactMessages(context, data) {
            return new Promise((resolve, reject) => {
                axios.get('/get-messages', {
                    params: {
                        skip: data.skip,
                        take: data.take
                    }
                }).then(res => {
                    if(!res.data.messages.length) {
                        context.commit('setDataFinished', true)
                    }

                    context.commit('contactUsMessagesSetter', res.data.messages)
                    context.commit('setUnreadEmails', res.data)

                    resolve(res)
                }).catch(err => {
                    context.dispatch('alert/alertResponse', {
                        'type': err.data.type,
                        'status': err.status,
                        'message': err.data.message
                    }, { root:true })
                    reject(err)
                })
            })
        },
        replyToMessage(context, data) {
            return new Promise((resolve, reject) => {
                axios.post('/reply-to-message', data).then((res) => {
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
