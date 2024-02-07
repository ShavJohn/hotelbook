const today = new Date();
today.setHours(0, 0, 0, 0)
const tomorrow = new Date();
tomorrow.setHours(0, 0, 0, 0)
tomorrow.setDate(today.getDate()+1);

export default {
    data() {
        return {
            bookingIndicators: [
                {
                    name: 'Search',
                    routeName: 'RoomSearch'
                },
                {
                    name: 'Bookings',
                    routeName: 'RoomBook'
                },
                {
                    name: 'Checkout',
                    routeName: 'RoomCheckout'
                },
                {
                    name: 'Thank you',
                    routeName: 'RoomFinishBooking'
                }
            ],
            guestCount: 1,
            today: today,
            endDayLimit: tomorrow,
            availableHours: [10,11,12,13,14,15,16,17],
            bookingPrice: 300,
            openFeaturesMenu: false,
            openServicesMenu: false,
            paymentMethod: 'payOnArrive',
            cardData: '',
            animationStarted: false
        }
    },
    computed: {
        bookingData() {
            return this.$store.getters['bookings/getBookingData']
        },
        bookingDate() {
            return this.$store.getters['bookings/getBookingDate']
        },
    },
    watch: {
        'bookingDate.startDate': function (val) {
            if(val >= this.bookingDate.endDate) {
                let currentDate = new Date(val)
                this.bookingDate.endDate = currentDate.setDate(currentDate.getDate()+1)
                this.bookingDate.endDate = new Date(this.bookingDate.endDate)
            }

            this.endDayLimit = this.endDayLimit.setDate(this.bookingDate.startDate.getDate()+1)
            this.endDayLimit = new Date(this.endDayLimit)
        },
    },
    methods: {
        checkAvailability(startDate, endDate, guestCount) {
            startDate = startDate.setHours(startDate.getHours() + 3)
            endDate = endDate.setHours(endDate.getHours() + 3)
            let data = {
                skip: 0,
                take: 5,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                guestCount: guestCount
            }

            this.$store.dispatch('rooms/getAvailableRooms', data)
        },
        bookRoom() {
            this.$store.dispatch('bookings/bookingRoom', this.bookingData).then(res => {
                if(res.data.success) {
                    this.$router.push({name: 'RoomFinishBooking'})
                }
            })
        },
        tuggleData(data) {
            if(!this.bookingData.guestData.extraServices.find(item => item.id === data.id)) {
                this.$store.commit('bookings/setExtraServices', data)
            } else {
                let key = this.bookingData.guestData.extraServices.findIndex(item => item.id === data.id)
                this.$store.commit('bookings/removeExtraServices', key)
            }
        },
        chooseRoom(roomData) {
            this.$store.commit('bookings/setChosenRoomData', roomData)
            this.$router.push({name: 'RoomBook'})
        },
        dateFormat(date, format) {
            return moment(date).format(format)
        },
    }
}
