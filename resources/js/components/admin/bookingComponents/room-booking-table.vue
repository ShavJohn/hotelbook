<template>
    <div class="room-booking-panel">
        <div class="table-btn-container">
            <button class="date-btn" @click="changeDate('prev')"><font-awesome-icon icon="fa-solid fa-chevron-left" /></button>
            <span>{{ displayDate(currentMonth, currentYear) }}</span>
            <button class="date-btn" @click="changeDate('next')"><font-awesome-icon icon="fa-solid fa-chevron-right" /></button>
        </div>
        <div class="inner-table">
            <table>
                <thead>
                <tr>
                    <th class="table-sticky">Rooms</th>
                    <th  v-for="date in monthDays" :key="date">
                        {{ customFormat(date) }}
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(room, rowIndex) in roomWithBooking" :key="room.number">
                    <th class="table-sticky">{{ room.number }}</th>
                    <td v-for="(booking, index) in bookingsData[rowIndex]" :key="index"
                        @click="openModal('#roomBookingAction', booking)"
                        :style="drawBooking(booking)">
                        <span v-if="booking.position === 'start'">
                            {{ customFormat(booking.startDate) }}
                        </span>
                        <span v-if="booking.position === 'end'">
                            {{ customFormat(booking.endDate) }}
                        </span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="hb-flex hb-justify-content-center margin-top">
            <button type="button" class="room-table-action-btn btn-bg-yellow" @click="changePage('prev')">Previous</button>
            <button type="button" class="room-table-action-btn btn-bg-yellow" @click="changePage('next')">Next</button>
        </div>
        <room-booking-action-modal :bookingData="currentBooking"/>
    </div>
</template>

<script>
import roomMixins from "../../../mixins/room-mixin";
import RoomBookingActionModal from "./room-booking-action-modal";

export default {
    name: "room-booking-table",
    components: {RoomBookingActionModal},
    data() {
        return {
            monthDays: [],
            currentMonth: new Date().getMonth() + 1,
            currentYear: new Date().getFullYear(),
            currentBooking: {}
        }
    },
    mixins: [roomMixins],
    computed: {
        bookings() {
            return this.$store.getters['bookings/getBookings']
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
    mounted() {
        this.etDaysInMonth(this.currentMonth, this.currentYear)
        let date = new Date(this.currentYear, this.currentMonth - 1, 1)
        const startOfMonth = moment(date).startOf('month').format('YYYY-MM-DD hh:mm:ss');
        // const endOfMonth   = moment(date).endOf('month').format('YYYY-MM-DD hh:mm::ss');

        let data = {
            startDate: startOfMonth,
        }
        this.$store.dispatch('bookings/getBookingsList', data)
    },
    watch: {
        currentMonth(val) {
            if(val === 0) {
                this.currentMonth = 12
                this.currentYear--
                this.etDaysInMonth(this.currentMonth, this.currentYear)
            } else if (val === 13) {
                this.currentMonth = 1
                this.currentYear++
                this.etDaysInMonth(this.currentMonth, this.currentYear)
            }
        }
    },
    methods: {
        openModal(modalId, booking) {
            this.currentBooking = booking
            $(modalId).modal("show");
        },
        calculateBookingPosition(roomData, date) {
            let position = '';

            for (let i = 0; i < roomData.bookings.length; ++i) {
                const startDate = moment(roomData.bookings[i].startDate).format('YYYY-MM-DD');
                const endDate = moment(roomData.bookings[i].endDate).format('YYYY-MM-DD');
                const currentDate = moment(date).format('YYYY-MM-DD');

                if (startDate <= currentDate && endDate >= currentDate) {
                    const booking = { ...roomData.bookings[i] }; // Create a new object
                    if (startDate === currentDate) {
                        position = 'start';
                    } else if (endDate === currentDate) {
                        position = 'end';
                    } else {
                        position = 'middle';
                    }
                    booking.position = position;
                    return booking; // Return the modified object
                }
            }

            return { position };
        },
        drawBooking(booking) {

            let style = ''
            if(Object.keys(booking).length) {
                style = 'cursor: pointer;'

                if (booking.position === 'start') {
                    style += 'border-left: 1px solid;border-top: 1px solid;border-bottom: 1px solid;border-bottom-left-radius: 15px;border-top-left-radius: 15px;';
                } else if (booking.position === 'end') {
                    style += 'border-right: 1px solid;border-top: 1px solid;border-bottom: 1px solid;border-bottom-right-radius: 15px;border-top-right-radius: 15px;';
                } else if (booking.position === 'middle') {
                    style += 'border-top: 1px solid;border-bottom: 1px solid;';
                }

                if(booking.bookingStatus === 'pending') {
                    style += 'background-color: #e0e0e0;border-color: #e0e0e0;'
                }
            }

            return style;
        },
        changeDate(type) {
            if(type === 'prev') {
                this.currentMonth--
                this.etDaysInMonth(this.currentMonth, this.currentYear)
            } else if(type === 'next') {
                this.currentMonth++
                this.etDaysInMonth(this.currentMonth, this.currentYear)
            }
        },
        etDaysInMonth(month,year) {
            const daysInMonth = [];
            const date = new Date(year, month - 1, 1); // Month is 0-indexed, so subtract 1

            while (date.getMonth() === month - 1) {
                daysInMonth.push(new Date(date));
                date.setDate(date.getDate() + 1);
            }

            this.monthDays = daysInMonth
        },
        customFormat(date) {
            return moment(date).format('MMM DD')
        },
        displayDate(month, year) {
            return moment([year, month-1, 1]).format('MMMM YYYY')
        }
    },
}
</script>

<style scoped>

</style>
