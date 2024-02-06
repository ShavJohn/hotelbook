<template>
    <modals modal-id="roomBookingAction">
        <template #modal-header>
            <h4>Room Booking Actions</h4>
            <div>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </template>
        <template #modal-body>
            <form class="modal-inputs-container decreasing-modal-height">
                <div class="input-elements">
                    <span class="input-name">Guest Name</span>
                    <input type="text" disabled id="guest-name" name="guest-name" placeholder="Enter Guest Name" v-model="bookingData.name">
                </div>
                <div class="input-elements">
                    <span class="input-name">Guest Lastname</span>
                    <input type="text" disabled id="guest-lastname" name="guest-lastname" placeholder="Enter Guest Lastname" v-model="bookingData.lastname">
                </div>
                <div class="input-elements">
                    <span class="input-name">Guest Email</span>
                    <input type="text" disabled id="guest-email" name="guest-email" placeholder="Enter Guest Email" v-model="bookingData.email">
                </div>
                <div class="input-elements">
                    <span class="input-name">Guest Phone</span>
                    <input type="text" disabled id="guest-phone" name="guest-phone" placeholder="Enter Guest Phone" v-model="bookingData.phone">
                </div>
                <div class="input-elements">
                    <span class="input-name">Guest Country</span>
                    <input type="text" disabled id="guest-country" name="guest-country" placeholder="Enter Guest Country" v-model="bookingData.country">
                </div>
                <div class="input-elements">
                    <span class="input-name">Guest City</span>
                    <input type="text" disabled id="guest-city" name="guest-city" placeholder="Enter Guest City" v-model="bookingData.city">
                </div>
                <div class="input-elements">
                    <span class="input-name">Guest Address</span>
                    <input type="text" disabled id="guest-address" name="guest-address" placeholder="Enter Guest Address" v-model="bookingData.address">
                </div>
                <div class="input-elements">
                    <span class="input-name">Guests Count</span>
                    <input type="text" disabled id="guest-count" name="guest-count" placeholder="Enter Guests Count" v-model="bookingData.guestCount">
                </div>
                <div class="input-elements">
                    <span class="input-name">Booking Status</span>
                    <select name="room-action-room-type" id="room-action-room-type" class="padding-vertical-micro padding-horizontal" v-model="bookingData.bookingStatus">
                        <option v-for="(bookingStatus, index) in bookingStatusList" :key="index" :value="bookingStatus">{{ bookingStatus }}</option>
                    </select>
                </div>
                <div class="input-elements">
                    <span class="input-name">Check-In Hour</span>
                    <drop-down class="margin-right">
                        <template #button>
                            {{ bookingData.checkIn }}
                        </template>
                        <template #dropdown-menu>
                            <li v-for="availableHour in availableHours"  @click="bookingData.checkIn = availableHour">{{ availableHour }}</li>
                        </template>
                    </drop-down>
                </div>
                <div class="input-elements">
                    <span class="input-name">Check-Out Hour</span>
                    <drop-down class="margin-right">
                        <template #button>
                            {{ bookingData.checkOut }}
                        </template>
                        <template #dropdown-menu>
                            <li v-for="availableHour in availableHours"  @click="bookingData.checkOut = availableHour">{{ availableHour }}</li>
                        </template>
                    </drop-down>
                </div>
                <div class="input-elements">
                    <span class="input-name">Check-In Date</span>
                    <div id="start-date-calendar" class="room-booking-action-modal">
                        <Datepicker class="cursor-pointer" v-model="bookingData.startDate" inputFormat="yyyy-MM-dd"></Datepicker>
                    </div>
                </div>
                <div class="input-elements">
                    <span class="input-name">Check-Out Date</span>
                    <div id="end-date-calendar" class="room-booking-action-modal">
                        <Datepicker class="cursor-pointer" v-model="bookingData.endDate" inputFormat="yyyy-MM-dd"></Datepicker>
                    </div>
                </div>
                <div class="input-elements">
                    <span class="input-name">Guests Message</span>
                    <p class="booking-message">{{ bookingData.message }}</p>
                </div>
            </form>
        </template>
        <template #modal-footer>
            <button type="button" data-bs-dismiss="modal" aria-label="Close" class="modal-btn btn-grey close">Close</button>
            <button type="button" class="modal-btn btn-action" @click="updateBooking(bookingData)">Update</button>
        </template>
    </modals>
</template>

<script>
import Modals from "../../mainComponents/modals";
import DropDown from "../../mainComponents/drop-down";
import adminBookingMixins from "../../../mixins/admin-booking-mixins";

export default {
    name: "room-booking-action-modal",
    components: {Modals, DropDown},
    mixins: [adminBookingMixins],
    props: {
        bookingData: {
            required: true
        }
    },
}
</script>

<style scoped>

</style>
