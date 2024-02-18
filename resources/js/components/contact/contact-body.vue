<template>
    <div class="contact-body">
        <div class="map-container" v-html="addressOnMap.value"></div>
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
            <button class="chosen-room-checkout-btn" @click="sendMessage()">Send
                <div v-if="loading" class="spinner-border loader-style" role="status">
                    <span class="sr-only"></span>
                </div>
            </button>
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
