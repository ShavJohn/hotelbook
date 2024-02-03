const today = new Date();
today.setHours(0, 0, 0, 0)
const tomorrow = new Date();
tomorrow.setHours(0, 0, 0, 0)
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
        }
    },
    getters: {
        getBookingData(state) {
            return state.bookingData
        },
        getBookingDate(state) {
            return state.bookingData.bookingDate
        }
    },
    mutations: {
        setGuestBookingData(state, data) {
            state.bookingData.guestData = data
        },
        setChosenRoomData(state, data) {
            state.bookingData.chosenRoom = data

            state.bookingData.guestData.extraServices = []

            data.room_options.forEach(item => {
                if(item.type === 'services') {
                    state.bookingData.guestData.extraServices.push(item)
                }
            })
        },
        setExtraServices(state, data) {
            state.bookingData.guestData.extraServices.push(data)
        },
        removeExtraServices(state, key) {
            state.bookingData.guestData.extraServices.splice(key, 1)
        },
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
                    reject(err)
                })
            })
        },
    }
}
