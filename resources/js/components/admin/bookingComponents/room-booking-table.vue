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
                        <th  v-for="date in monthDays">
                            {{ customFormat(date) }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                <tr v-for="room in roomsData">
                    <th class="table-sticky">{{ room.number }}</th>
                    <td v-for="date in monthDays">
                        available
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="hb-flex hb-justify-content-center margin-top">
            <button type="button" class="room-table-action-btn btn-bg-yellow" @click="changePage('prev')">Previous</button>
            <button type="button" class="room-table-action-btn btn-bg-yellow" @click="changePage('next')">Next</button>
        </div>
    </div>
</template>

<script>
import roomMixins from "../../../mixins/room-mixin";

export default {
    name: "room-booking-table",
    data() {
        return {
            monthDays: [],
            currentMonth: new Date().getMonth() + 1,
            currentYear: new Date().getFullYear(),
        }
    },
    mixins: [roomMixins],
    mounted() {
        this.etDaysInMonth(10, 2023)
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
    }
}
</script>

<style scoped>

</style>
