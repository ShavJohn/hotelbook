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
            startDate: today,
            endDate: tomorrow,
            endDayLimit: tomorrow,
            availableHours: [10,11,12,13,14,15,16,17],
            bookingPrice: 300,
            openFeaturesMenu: false,
            openServicesMenu: false,
            paymentMethod: 'payOnArrive',
            cardData: '',
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
        startDate(val) {
            if(val >= this.endDate) {
                let currentDate = new Date(val)
                this.endDate = currentDate.setDate(currentDate.getDate()+1)
                this.endDate = new Date(this.endDate)
            }

            this.endDayLimit = this.endDayLimit.setDate(this.startDate.getDate()+1)
            this.endDayLimit = new Date(this.endDayLimit)
        },
    },
    methods: {
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
            let dates = {
                startDate: this.startDate,
                endDate: this.endDate
            }
            this.$store.commit('bookings/setChosenRoomData', roomData)
            this.$router.push({name: 'RoomBook'})
        },
        dateFormat(date, format) {
            return moment(date).format(format)
        },
    }
}
