<template>
    <div  class="room-book-container-last-step">
        <div>
            <div class="finish-message-container">
                <h2>{{ $t('thank_you') }}!</h2>
                <p>{{ $t('booking_process_message') }}</p>
                <font-awesome-icon icon="fa-solid fa-check" />
            </div>
            <div class="finish-booking-btn-container">
                <button class="chosen-room-checkout-btn" @click="$router.push({name: 'Home'})">
                    {{ $t('go_to_home') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import BookingMixins from "../../../mixins/booking-mixins";

export default {
    name: "room-finish-booking",
    mixins: [BookingMixins],
    mounted() {
        if(!Object.keys(this.bookingData.chosenRoom).length) {
            this.$router.push({name: 'RoomSearch'})
        }
    }
}
</script>

<style scoped>

</style>
