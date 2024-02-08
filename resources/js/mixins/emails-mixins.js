export default {
    data() {
        return {
            emailInfo: {
                name: '',
                email: '',
                phone_number: '',
                message: '',
                custom_input_form: {}
            },
            replyData: {
                title: '',
                message: '',
            },
            loading: false,
            skip: 0,
            take: 10,
        }
    },
    computed: {
        messages() {
            return this.$store.getters['emails/contactUsMessagesGetter']
        },
        selectedMessage() {
            return this.$store.getters['emails/getSelectedMessage']
        },
        displayTab() {
            return this.$store.getters['emails/getDisplayTab']
        },
        dataFinished() {
            return this.$store.getters['emails/getDataFinished']
        }
    },
    methods: {
        updateEmailStatus(message, key) {
            if(!message.read) {
                let data = {
                    key: key,
                    id: message.id
                }

                this.$store.dispatch('emails/updateEmailStatus', data)
            }
        },
        formatDate(date) {
            return moment(date).format('MM/DD/YYYY hh:mm')
        },
        toggleMessages(message, type, key) {
            this.$store.commit('emails/setSelectedMessage', message)
            this.$store.commit('emails/setDisplayType', type)
            this.$store.commit('emails/setCurrentKey', key)
        },
        sendMessage() {
            if(this.emailInfo.name.length && this.emailInfo.email.length && this.emailInfo.message.length) {
                this.loading = true
                this.$store.dispatch('emails/sendMessage', this.emailInfo).then(res => {
                    this.emailInfo.name = ''
                    this.emailInfo.email = ''
                    this.emailInfo.phone_number = ''
                    this.emailInfo.message = ''
                    this.emailInfo.custom_input_form = ''

                    this.loading = false

                    this.$store.dispatch('alert/alertResponse', {
                        'type': res?.data?.type,
                        'message': res?.data?.message
                    })
                }).catch(err => {
                    this.loading = false
                    this.$store.dispatch('alert/alertResponse', {
                        'type': err?.data?.type,
                        'message': err?.data?.message
                    })
                })
            } else {
                let message = ''
                if(!this.emailInfo.name.length ) {
                    message = 'Name field is required'
                } else if(!this.emailInfo.email.length) {
                    message = 'Email field is required'
                } else if(!this.emailInfo.message.length) {
                    message = 'Message field is required'
                }

                this.$store.dispatch('alert/alertResponse', {
                    'type': 'error',
                    'message': message
                })
            }
        },
        getEmails(skip = 0, take = 10) {
            let data = {
                skip: skip,
                take: take
            }
            this.$store.dispatch('emails/getContactMessages', data)
        },
        reply() {
            let data = {
                messageSelected: this.selectedMessage,
                replyData: this.replyData
            }

            this.$store.commit('emails/updateEmailData', data.replyData)

            this.$store.dispatch('emails/replyToMessage', data).then(res => {
                this.$store.dispatch('alert/alertResponse', {
                    'type': res?.data?.type,
                    'message': res?.data?.message
                })
            }).catch(err => {
                this.$store.dispatch('alert/alertResponse', {
                    'type': err?.data?.type,
                    'message': err?.data?.message
                })
            })
        }
    },
}
