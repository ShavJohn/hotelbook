<template>
    <div class="room-booking-panel">
        <div class="table-btn-container">
            <button class="date-btn" @click="changeDate('prev')"><font-awesome-icon icon="fa-solid fa-chevron-left" /></button>
            <span class="text-center">{{ displayDate(currentMonth, currentYear) }}</span>
            <button class="date-btn" @click="changeDate('next')"><font-awesome-icon icon="fa-solid fa-chevron-right" /></button>
        </div>
        <div class="color-coding-container">
            <div class="color-coding" v-for="bookingStatus in bookingStatusList">
                <span class="color-code" :class="`color-${bookingStatus}`"></span>
                <span class="color-name">- {{ bookingStatus }}</span>
            </div>
        </div>
        <div class="inner-table">
            <table :key="updateKey">
                <thead>
                <tr>
                    <th class="padding-horizontal-small">Rooms</th>
                    <th  v-for="date in monthDays" :key="date">
                        {{ customFormat(date) }}
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(room, rowIndex) in roomWithBooking" :key="room.number">
                    <th class="table-sticky">{{ room.number }}</th>
                    <td v-for="(bookings, index) in bookingsData[rowIndex]" :key="index">
                        <div v-for="(booking, bookingIndex) in bookings" :key="bookingIndex"
                             :class="(booking && Object.keys(booking).length) && `draw-booking-container-${booking.position}`">
                            <div v-if="booking && Object.keys(booking).length"
                                 @click="openModal('#roomBookingAction', booking)"
                                 class="draw-booking-item"
                                 :class="[`draw-booking-item-${booking.position}`, `draw-booking-item-status-${booking.bookingStatus}`]">
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="hb-flex hb-justify-content-center margin-top">
            <button type="button" class="room-table-action-btn btn-bg-yellow" @click="changePage('prev')">Previous</button>
            <button type="button" class="room-table-action-btn btn-bg-yellow" @click="changePage('next')">Next</button>
        </div>
        <room-booking-action-modal :bookedRoomData="currentBooking"/>
        <remove-booking-modal :removeBookingId="currentBooking.id"/>
    </div>
</template>

<script>
import roomMixins from "../../../mixins/room-mixin";
import RoomBookingActionModal from "./room-booking-action-modal";
import adminBookingMixins from "../../../mixins/admin-booking-mixins";
import RemoveBookingModal from "./remove-booking-modal";

export default {
    name: "room-booking-table",
    components: {RemoveBookingModal, RoomBookingActionModal},
    mixins: [roomMixins, adminBookingMixins],
    mounted() {
        this.getBookingsList()
        this.getRooms()
    }
}
</script>

<style scoped>

</style>
