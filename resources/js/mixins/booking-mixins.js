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
            checkinHour: 12,
            checkoutHour: 12,
            availableHours: [10,11,12,13,14,15,16,17],
            bookingPrice: 300,
            openFeaturesMenu: false,
            openServicesMenu: false,
            paymentMethod: 'creditCard',
            cardData: '',
            roomFeatures: [
                {
                    name: 'Wi-Fi',
                    type: 'wifi',
                    included: false
                },
                {
                    name: 'TV',
                    type: 'tv',
                    included: true
                },
                {
                    name: 'Pool',
                    type: 'pool',
                    included: true
                },
                {
                    name: 'Smart Lock',
                    type: 'smart-lock',
                    included: false
                }
            ],
            roomServices: [
                {
                    name: 'Cleaning',
                    type: 'cleaning',
                    included: false
                },
                {
                    name: 'Laundry',
                    type: 'laundry',
                    included: true
                },
                {
                    name: 'Breakfast',
                    type: 'breakfast',
                    included: true
                },
                {
                    name: 'Parking',
                    type: 'parking',
                    included: false
                }
            ]
        }
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
        dateFormat(date, format) {
            return moment(date).format(format)
        },
    }
}
