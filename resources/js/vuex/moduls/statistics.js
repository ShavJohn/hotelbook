export default {
    namespaced: true,
    state: {
        visitors: [],
        guests: [],
        bookings: [],
        income: []
    },
    getters: {
        getVisitors(state) {
            return state.visitors
        },
        getGuests(state) {
            return state.guests
        },
        getBookings(state) {
            return state.bookings
        },
        getIncome(state) {
            return state.income
        }
    },
    mutations: {
        setVisitors(state, data) {
            state.visitors = data
        },
        setGuests(state, data) {
            state.guests = data
        },
        setBookings(state, data) {
            state.bookings = data
        },
        setIncome(state, data) {
            state.income = data
        }
    },
    actions: {
        countVisitor(context, data) {
            return new Promise((resolve, reject) => {
                axios.post('/count-visitor', data).then(res => {

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
        }
    }
}
