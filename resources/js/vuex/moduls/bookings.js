const today = new Date();
today.setHours(4, 0, 0, 0)
const tomorrow = new Date();
tomorrow.setHours(4, 0, 0, 0)
tomorrow.setDate(today.getDate()+1);
export default {
    namespaced: true,
    state: {
        bookingData: {
            chosenRoom: {},
            guestData: {
                name: '',
                lastname: '',
                email: '',
                phone: '',
                country: '',
                city: '',
                address: '',
                checkIn: 12,
                checkOut: 12,
                message: '',
                extraServices: []
            },
            guestCount: 1,
            bookingDate: {
                startDate: today,
                endDate: tomorrow,
            }
        },
        bookings: [],
        pendingBookings: 0,
    },
    getters: {
        getBookingData(state) {
            return state.bookingData
        },
        getBookingDate(state) {
            return state.bookingData.bookingDate
        },
        getBookings(state) {
            return state.bookings
        },
        getPendingBookings(state) {
            return state.pendingBookings
        }
    },
    mutations: {
        setGuestBookingData(state, data) {
            state.bookingData.guestData = data
        },
        setChosenRoomData(state, data) {
            state.bookingData.chosenRoom = data

            state.bookingData.guestData.extraServices = []

            if(data.room_options && data.room_options.length) {
                data.room_options.forEach(item => {
                    if(item.type === 'services') {
                        state.bookingData.guestData.extraServices.push(item)
                    }
                })
            }
        },
        setBookings(state, data) {
            state.bookings = data.bookings
        },
        setExtraServices(state, data) {
            state.bookingData.guestData.extraServices.push(data)
        },
        removeExtraServices(state, key) {
            state.bookingData.guestData.extraServices.splice(key, 1)
        },
        setPendingBookings(state, data) {
            state.pendingBookings = data.pendingBookings
        }
    },
    actions: {
        bookingRoom(context, data) {
            return new Promise((resolve, reject) => {
                axios.post('/booking-room', data).then(res => {

                    context.dispatch('alert/alertResponse', {
                        'type': res.data.type,
                        'status': res.status,
                        'message': res.data.message
                    }, { root:true })

                    resolve(res)
                }).catch(err => {
                    if(err && err.data) {
                        context.dispatch('alert/alertResponse', {
                            'type': err.data.type,
                            'status': err.status,
                            'message': err.data.message
                        }, { root:true })
                    }
                    reject(err)
                })
            })
        },
        getBookingsList(context, data) {
            return new Promise((resolve, reject) => {
                axios.get('/get-bookings-list', {params: data}).then(res => {
                    if(res && res.data) {
                        context.commit('setBookings', res.data)
                        context.commit('setPendingBookings', res.data)
                    }
                    resolve(res)
                }).catch(err => {
                    if(err && err.data) {
                        context.dispatch('alert/alertResponse', {
                            'type': err.data.type,
                            'status': err.status,
                            'message': err.data.message
                        }, { root:true })
                    }
                    reject(err)
                })
            })
        },
        updateBooking(context, data) {
            return new Promise((resolve, reject) => {
                axios.put(`/update-booking/${data.id}`, data).then(res => {
                    context.dispatch('alert/alertResponse', {
                        'type': res.data.type,
                        'status': res.status,
                        'message': res.data.message
                    }, { root:true })
                    resolve(res)
                }).catch(err => {
                    if(err && err.data) {
                        context.dispatch('alert/alertResponse', {
                            'type': err.data.type,
                            'status': err.status,
                            'message': err.data.message
                        }, { root:true })
                    }
                    reject(err)
                })
            })
        },
        deleteBooking(context, data) {
            return new Promise((resolve, reject) => {
                axios.delete(`/delete-booking/${data}`).then(res => {
                    context.dispatch('alert/alertResponse', {
                        'type': res.data.type,
                        'status': res.status,
                        'message': res.data.message
                    }, { root:true })
                    resolve(res)
                }).catch(err => {
                    if(err && err.data) {
                        context.dispatch('alert/alertResponse', {
                            'type': err.data.type,
                            'status': err.status,
                            'message': err.data.message
                        }, { root:true })
                    }
                    reject(err)
                })
            })
        }
    }
}
