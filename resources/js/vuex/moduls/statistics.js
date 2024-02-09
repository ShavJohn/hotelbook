export default {
    namespaced: true,
    state: {
        visitors: [],
        visitorsCount: 0,
        pageReloads: [],
        pageReloadsCount: 0,
        guests: [],
        guestsCount: 0,
        bookings: [],
        bookingsCount: 0,
        income: [],
        incomeTotal: 0
    },
    getters: {
        getVisitors(state) {
            return state.visitors
        },
        getVisitorsCount(state) {
            return state.visitorsCount
        },
        getPageReloads(state) {
            return state.pageReloads
        },
        getPageReloadsCount(state) {
            return state.pageReloadsCount
        },
        getGuests(state) {
            return state.guests
        },
        getGuestsCount(state) {
            return state.guestsCount
        },
        getBookings(state) {
            return state.bookings
        },
        getBookingsCount(state) {
            return state.bookingsCount
        },
        getIncome(state) {
            return state.income
        },
        getIncomeTotal(state) {
            return state.incomeTotal
        }
    },
    mutations: {
        setVisitors(state, data) {
            state.visitors = data
        },
        setVisitorsCount(state, data) {
            state.visitorsCount = data
        },
        setPageReloads(state, data) {
            state.pageReloads = data
        },
        setPageReloadsCount(state, data) {
            state.pageReloadsCount = data
        },
        setGuests(state, data) {
            state.guests = data
        },
        setGuestsCount(state, data) {
            state.guestsCount = data
        },
        setBookings(state, data) {
            state.bookings = data
        },
        setBookingsCount(state, data) {
            state.bookingsCount = data
        },
        setIncome(state, data) {
            state.income = data
        },
        setIncomeTotal(state, data) {
            state.incomeTotal = data
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
        },
        getStatistics(context, data) {
            return new Promise((resolve, reject) => {
                axios.get('/get-statistics-data', {params: data}).then(res => {
                    context.commit('setVisitors', res.data.visitors)
                    context.commit('setVisitorsCount', res.data.visitorsCount)
                    context.commit('setPageReloads', res.data.pageReloads)
                    context.commit('setPageReloadsCount', res.data.pageReloadsCount)
                    context.commit('setGuests', res.data.guests)
                    context.commit('setGuestsCount', res.data.guestsCount)
                    context.commit('setBookings', res.data.bookings)
                    context.commit('setBookingsCount', res.data.bookingsCount)
                    context.commit('setIncome', res.data.income)
                    context.commit('setIncomeTotal', res.data.totalIncome)
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
