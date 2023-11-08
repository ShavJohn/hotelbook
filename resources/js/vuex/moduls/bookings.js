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
                lastName: '',
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
        },
        setExtraServices(state, data) {
            state.bookingData.guestData.extraServices.push(data)
        },
        removeExtraServices(state, key) {
            state.bookingData.guestData.extraServices.splice(key, 1)
        },
    },
    actions: {

    }
}
