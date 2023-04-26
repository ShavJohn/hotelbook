<template>
    <div class="responsive-background-image position-relative" style="background-image: url(http://www.nicdarkthemes.com/themes/hotel-inn/wp/demo/inn-suites/wp-content/uploads/sites/2/2021/11/parallax-10.jpg)">
        <div class="background-image-filter">
            <animate-text class="header-text-styling" text="Rooms" :display-time="500"/>
            <div class="booking-steps-indicator-container">
                <div v-for="(text, index) in bookingIndicators" class="booking-steps-indicator"
                     :class="activeIndicator === index+1 && 'active-indicator'">
                    <div class="number-indicator"><span>{{ index+1 }}</span></div>
                    <span class="text-indicator">{{ text }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AnimateText from "../mainComponents/animate-text";
import BookingMixins from "../../mixins/booking-mixins"
export default {
    name: "room-header",
    components: {AnimateText},
    mixins: [BookingMixins],
    data() {
        return {

        }
    }
}
</script>

<style scoped>

</style>
