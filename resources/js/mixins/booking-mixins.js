const today = new Date();
today.setHours(4, 0, 0, 0)
const tomorrow = new Date();
tomorrow.setHours(4, 0, 0, 0)
tomorrow.setDate(today.getDate()+1);

export default {
    data() {
        return {
            bookingIndicators: [
                {
                    name: 'search',
                    routeName: 'RoomSearch'
                },
                {
                    name: 'bookings',
                    routeName: 'RoomBook'
                },
                {
                    name: 'check_out',
                    routeName: 'RoomCheckout'
                },
                {
                    name: 'thank_you',
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
            animationStarted: false,
            termsAndConditionsCheckBox: false,
        }
    },
    computed: {
        bookingData() {
            return this.$store.getters['bookings/getBookingData']
        },
        bookingDate() {
            return this.$store.getters['bookings/getBookingDate']
        },
        termsAndConditions() {
            return this.$store.getters['generalSettings/termsAndConditions']
        },
    },
    watch: {
        'bookingDate.startDate': function (val) {
            if(val >= this.bookingDate.endDate) {
                let currentDate = new Date(val)
                this.bookingDate.endDate = currentDate.setDate(currentDate.getDate()+1)
                this.bookingDate.endDate = new Date(this.bookingDate.endDate)
            }

            this.endDayLimit = new Date(val);
            this.endDayLimit.setDate(this.endDayLimit.getDate() + 1);
        },
    },
    methods: {
        checkRoomIfBusy(busy) {
            this.$store.commit('rooms/setIsRoomBusy', busy)
        },
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
            this.$router.push({name: 'RoomSearch'})
        },
        confirmTermsAndConditions() {
            if(this.termsAndConditionsCheckBox) {
                $('#terms-and-conditions').modal('hide')
                this.$store.dispatch('bookings/bookingRoom', this.bookingData).then(res => {
                    if(res.data.success) {
                        this.$router.push({name: 'RoomFinishBooking'})
                    }
                })
            } else {
                this.$store.dispatch('alert/alertResponse', {
                    'type': 'error',
                    'status': 0,
                    'message': 'Please check conditions'
                })
            }
        },
        bookRoom() {
            if(this.termsAndConditions && this.termsAndConditions.json_value && Object.keys(this.termsAndConditions.json_value).length && this.termsAndConditions.json_value.termsAdnConditionsSwitch) {
                $('#terms-and-conditions').modal('show')
            } else {
                this.$store.dispatch('bookings/bookingRoom', this.bookingData).then(res => {
                    if(res.data.success) {
                        this.$router.push({name: 'RoomFinishBooking'})
                    }
                })
            }
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
    }
}
