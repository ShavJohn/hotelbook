<template>
    <div class="contact-body">
        <div class="map-container">
            <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3049.645392878536!2d44.525879!3d40.150182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDA5JzAwLjciTiA0NMKwMzEnMzMuMiJF!5e0!3m2!1shy!2sam!4v1684322713006!5m2!1shy!2sam" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div class="contact-us-inputs">
            <div class="contact-us-input">
                <label for="user-name">Name</label>
                <input id="user-name" type="text" name="user-name" placeholder="Enter your Name" v-model="emailInfo.name">
                <div class="input-delimiter"></div>
            </div>
            <div class="contact-us-input">
                <label for="user-email">Email</label>
                <input id="user-email" type="email" name="user-email" placeholder="Enter your Email" v-model="emailInfo.email">
                <div class="input-delimiter"></div>
            </div>
            <div class="contact-us-input">
                <label for="user-phone">Phone number</label>
                <input id="user-phone" type="tel" name="user-phone" placeholder="Enter your Phone" v-model="emailInfo.phone_number">
                <div class="input-delimiter"></div>
            </div>
            <div class="contact-us-input text-area">
                <label>Message</label>
                <textarea id="user-message" name="user-message" placeholder="Enter your message" v-model="emailInfo.message"></textarea>
                <div class="input-delimiter"></div>
            </div>
            <button class="chosen-room-checkout-btn" @click="sendMessage()">Send</button>
        </div>
    </div>
</template>

<script>
import emails from "../../mixins/emails-mixins";

export default {
    name: "contact-body'",
    mixins: [emails],
}
</script>

<style scoped>

</style>
