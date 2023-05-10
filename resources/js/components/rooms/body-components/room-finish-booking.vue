<template>
    <div  class="room-book-container">
        <div class="your-information-container">
            <h2>Your Order Details</h2>
            <ul>
                <li><span>Name:</span><span>{{  }}</span></li>
                <li><span>Lastname:</span><span>{{  }}</span></li>
                <li><span>Email:</span><span>{{  }}</span></li>
                <li><span>Phone:</span><span>{{  }}</span></li>
                <li><span>Address:</span><span>{{  }}</span></li>
                <li><span>City:</span><span>{{  }}</span></li>
                <li><span>County:</span><span>{{  }}</span></li>
                <li><span>Check-In:</span><span>{{  }}</span></li>
                <li><span>Check-Out:</span><span>{{  }}</span></li>
                <li><span>Message:</span><span>{{  }}</span></li>
            </ul>
            <h3>Extra Services:</h3>
            <ul>
                <li>Cleaning</li>
            </ul>
            <h3>Payment Option:</h3>
            <span>
                <template v-if="paymentMethod === 'creditCard'">
                    By Credit Card
                </template>
                <template>
                    Pay on Arrive
                </template>
            </span>
            <div class="margin-top-large">
                <button class="chosen-room-checkout-btn">
                    Go to home
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
}
</script>

<style scoped>

</style>
