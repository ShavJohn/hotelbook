export default {
    data() {
        return {
            monthDays: [],
            currentMonth: new Date().getMonth() + 1,
            currentYear: new Date().getFullYear(),
            currentBooking: {},
            bookingStatusList: [
                'pending',
                'active',
                'canceled'
            ],
            availableHours: [10,11,12,13,14,15,16,17],
            updateKey: 0,
        }
    },
    mounted() {
        this.daysInMonth(this.currentMonth, this.currentYear)

        this.getBookingsList()
    },
    computed: {
        bookings() {
            return this.$store.getters['bookings/getBookings']
        },
        roomsData() {
            return this.$store.getters['rooms/roomsGetter']
        },
        roomWithBooking() {
            for(let i = 0; i < this.roomsData.length; ++i) {
                this.roomsData[i].bookings = this.bookings.filter(room => {
                    return room.booked_room.some(bookedRoom => bookedRoom.id === this.roomsData[i].id);
                });
            }

            return this.roomsData
        },
        bookingsData() {
            return this.roomWithBooking.map((room) => {
                return this.monthDays.map((date) => {
                    return this.calculateBookingPosition(room, date);
                });
            });
        }
    },
    watch: {
        currentMonth(val) {
            if(val === 0) {
                this.currentMonth = 12
                this.currentYear--
                this.daysInMonth(this.currentMonth, this.currentYear)
            } else if (val === 13) {
                this.currentMonth = 1
                this.currentYear++
                this.daysInMonth(this.currentMonth, this.currentYear)
            }
            this.getBookingsList()
        }
    },
    methods: {
        dateFormat(date, format) {
            return moment(date).format(format)
        },
        updateBooking(bookingData) {
            bookingData.startDate.setHours(bookingData.startDate.getHours() + 3);
            bookingData.endDate.setHours(bookingData.endDate.getHours() + 3);
            this.$store.dispatch('bookings/updateBooking', bookingData).then(res => {
                if(res.data.success) {
                    this.getBookingsList()
                    this.updateKey++
                    $('#roomBookingAction').modal("hide");
                }
            })
        },
        openModal(modalId, booking) {
            if(Object.keys(booking).length) {
                this.currentBooking = booking
                this.currentBooking.startDate = new Date(this.currentBooking.startDate)
                this.currentBooking.endDate = new Date(this.currentBooking.endDate)
                $(modalId).modal("show");
            }
        },
        calculateBookingPosition(roomData, date) {
            let bookingsForDay = [];

            for (let i = 0; i < roomData.bookings.length; ++i) {
                const startDate = moment(roomData.bookings[i].startDate).format('YYYY-MM-DD');
                const endDate = moment(roomData.bookings[i].endDate).format('YYYY-MM-DD');
                const currentDate = moment(date).format('YYYY-MM-DD');

                if (startDate <= currentDate && endDate >= currentDate) {
                    const position = (startDate === currentDate) ? 'start' : (endDate === currentDate) ? 'end' : 'middle';
                    const booking = { ...roomData.bookings[i], position };
                    bookingsForDay.push(booking);
                }
            }

            return bookingsForDay;
        },
        changeDate(type) {
            if(type === 'prev') {
                this.currentMonth--
                this.daysInMonth(this.currentMonth, this.currentYear)
            } else if(type === 'next') {
                this.currentMonth++
                this.daysInMonth(this.currentMonth, this.currentYear)
            }
        },
        daysInMonth(month,year) {
            const daysInMonth = [];
            const date = new Date(year, month - 1, 1); // Month is 0-indexed, so subtract 1

            while (date.getMonth() === month - 1) {
                daysInMonth.push(new Date(date));
                date.setDate(date.getDate() + 1);
            }

            this.monthDays = daysInMonth
        },
        getBookingsList(){
            let date = new Date(this.currentYear, this.currentMonth - 1, 1)
            const startOfMonth = moment(date).startOf('month').format('YYYY-MM-DD hh:mm:ss');
            // const endOfMonth   = moment(date).endOf('month').format('YYYY-MM-DD hh:mm::ss');

            let data = {
                startDate: startOfMonth,
            }
            this.$store.dispatch('bookings/getBookingsList', data)
        },
        customFormat(date) {
            return moment(date).format('MMM DD')
        },
        displayDate(month, year) {
            return moment([year, month-1, 1]).format('MMMM YYYY')
        }
    },
}
