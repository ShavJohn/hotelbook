<template>
    <div class="room-book-container">
        <div class="extra-services-container">
            <h2>Add Extra Services</h2>
            <ul class="extra-services-list">
                <li v-for="roomFeature in roomFeatures">
                    <input type="checkbox" :id="roomFeature.type" :name="roomFeature.type" @change="tuggleData(roomFeature)">
                    <label :for="roomFeature.type">{{ roomFeature[localeLang].name }}</label>
                </li>
                <li v-for="roomService in roomServices">
                    <input type="checkbox" :id="roomService.type" :name="roomService.type" @change="tuggleData(roomService)">
                    <label :for="roomService.type">{{ roomService[localeLang].name }}</label>
                </li>
            </ul>
        </div>
        <h2 class="margin-top-large">Add Your Information</h2>
        <div class="booked-room-inputs-container">
            <div class="booked-room-input">
                <label for="user-name">Name</label>
                <input id="user-name" type="text" name="user-name" placeholder="Enter your name"
                       v-model="bookingData.guestData.name">
                <div class="input-delimiter"></div>
            </div>
            <div class="booked-room-input">
                <label for="user-lastname">Lastname</label>
                <input id="user-lastname" type="text" name="user-lastname" placeholder="Enter your lastname"
                        v-model="bookingData.guestData.lastName">
                <div class="input-delimiter"></div>
            </div>
            <div class="booked-room-input">
                <label for="user-email">Email</label>
                <input id="user-email" type="email" name="user-email" placeholder="Enter your email"
                        v-model="bookingData.guestData.email">
                <div class="input-delimiter"></div>
            </div>
            <div class="booked-room-input">
                <label for="user-phone">Phone</label>
                <input id="user-phone" type="tel" name="user-phone" placeholder="Enter your phone"
                       v-model="bookingData.guestData.phone">
                <div class="input-delimiter"></div>
            </div>
            <div class="booked-room-input">
                <label for="user-address">Address</label>
                <input id="user-address" type="text" name="user-address" placeholder="Enter your address"
                       v-model="bookingData.guestData.address">
                <div class="input-delimiter"></div>
            </div>
            <div class="booked-room-input">
                <label for="user-city">City</label>
                <input id="user-city" type="text" name="user-city" placeholder="Enter your city"
                       v-model="bookingData.guestData.city">
                <div class="input-delimiter"></div>
            </div>
            <div class="booked-room-input">
                <label for="user-country">Country</label>
                <input id="user-country" type="text" name="user-country" placeholder="Enter your country"
                       v-model="bookingData.guestData.country">
                <div class="input-delimiter"></div>
            </div>
            <div class="booked-room-dropdown">
                <div class="hour-dropdowns">
                    <label for="user-country">Check-In</label>
                    <drop-down>
                        <template #button>
                            {{ bookingData.guestData.checkIn }}
                        </template>
                        <template #dropdown-menu>
                            <li  @click="bookingData.guestData.checkIn = availableHour" v-for="availableHour in availableHours">{{ availableHour }}</li>
                        </template>
                    </drop-down>
                </div>
                <div class="hour-dropdowns">
                    <label for="user-country">Check-Out</label>
                    <drop-down>
                        <template #button>
                            {{ bookingData.guestData.checkOut }}
                        </template>
                        <template #dropdown-menu>
                            <li @click="bookingData.guestData.checkOut = availableHour" v-for="availableHour in availableHours">{{ availableHour }}</li>
                        </template>
                    </drop-down>
                </div>
            </div>
            <div class="booked-room-input text-area">
                <label>Message</label>
                <textarea id="user-message"  name="user-message" placeholder="Enter your message"
                          v-model="bookingData.guestData.message"></textarea>
                <div class="input-delimiter"></div>
            </div>
            <button class="chosen-room-checkout-btn" @click="checkout()">
                Checkout
            </button>
        </div>
    </div>
</template>

<script>
import BookingMixins from "../../../mixins/booking-mixins";
import DropDown from "../../mainComponents/drop-down";
import roomMixins from "../../../mixins/room-mixin";

export default {
    name: "room-book",
    components: {DropDown},
    mixins: [BookingMixins, roomMixins],
    mounted() {
        this.$store.dispatch('rooms/getRoomFST')
    }
}
</script>

<style scoped>

</style>
