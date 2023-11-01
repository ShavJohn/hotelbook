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
            messageReceiverData: {},
            replyData: {
                title: '',
                message: '',
            },
            loading: false,
            skip: 0,
            take: 10
        }
    },
    computed: {
        messages() {
            return this.$store.getters['emails/contactUsMessagesGetter']
        },
    },
    methods: {
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

                    this.$emit('alert', {
                        'type': res.data.type,
                        'message': res.data.message
                    })
                }).catch(err => {
                    this.loading = false
                    this.$emit('alert', {
                        'type': err.data.type,
                        'message': err.data.message
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

                this.$emit('alert', {
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
                messageReceiverData: this.messageReceiverData,
                replyData: this.replyData
            }

            this.$store.dispatch('emails/replyToMessage', data).then(res => {
                if(res.data.success) {
                }
                this.$emit('alert', {
                    'type': res.data.type,
                    'message': res.data.message
                })
            }).catch(err => {
                this.$emit('alert', {
                    'type': err.data.type,
                    'message': err.data.message
                })
            })
        }
    },
}
