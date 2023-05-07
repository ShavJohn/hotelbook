<template>
    <div class="room-book-container">
        <div class="extra-services-container">
            <h2>Add Extra Services</h2>
            <ul class="extra-services-list">
                <li v-for="roomFeature in roomFeatures">
                    <input type="checkbox" :id="roomFeature.type" :name="roomFeature.type" v-model="roomFeature.included">
                    <label :for="roomFeature.type">{{ roomFeature.name }}</label>
                </li>
            </ul>


            <h2 class="margin-top-large">Add Your Information</h2>
            <div class="booked-room-inputs-container">
                <div class="booked-room-input">
                    <label for="user-name">Name</label>
                    <input id="user-name" type="text" name="user-name" placeholder="Enter your name">
                    <div class="input-delimiter"></div>
                </div>
                <div class="booked-room-input">
                    <label for="user-lastname">Lastname</label>
                    <input id="user-lastname" type="text" name="user-lastname" placeholder="Enter your lastname">
                    <div class="input-delimiter"></div>
                </div>
                <div class="booked-room-input">
                    <label for="user-email">Email</label>
                    <input id="user-email" type="email" name="user-email" placeholder="Enter your email">
                    <div class="input-delimiter"></div>
                </div>
                <div class="booked-room-input">
                    <label for="user-phone">Phone</label>
                    <input id="user-phone" type="tel" name="user-phone" placeholder="Enter your phone">
                    <div class="input-delimiter"></div>
                </div>
                <div class="booked-room-input">
                    <label for="user-address">Address</label>
                    <input id="user-address" type="text" name="user-address" placeholder="Enter your address">
                    <div class="input-delimiter"></div>
                </div>
                <div class="booked-room-input">
                    <label for="user-city">City</label>
                    <input id="user-city" type="text" name="user-city" placeholder="Enter your city">
                    <div class="input-delimiter"></div>
                </div>
                <div class="booked-room-input">
                    <label for="user-country">Country</label>
                    <input id="user-country" type="text" name="user-country" placeholder="Enter your country">
                    <div class="input-delimiter"></div>
                </div>
                <div class="booked-room-input text-area">
                    <label>Message</label>
                    <textarea id="user-message"  name="user-message" placeholder="Enter your message"></textarea>
                    <div class="input-delimiter"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BookingMixins from "../../../mixins/booking-mixins";

export default {
    name: "room-book",
    mixins: [BookingMixins],
}
</script>

<style scoped>

</style>
