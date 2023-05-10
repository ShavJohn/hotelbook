<template>
    <div  class="room-book-container">
        <div class="your-information-container">
            <h2>Your Information</h2>
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
        </div>
        <div class="payment-option">
            <h2>Payment Option</h2>
            <div class="payment-type-option-menu">
                <ul>
                    <li><input id="creditcard" type="radio" name="payment-option" value="creditCard" v-model="paymentMethod"><label for="creditcard">Credit Card</label></li>
                    <li><input id="peyonarrive" type="radio" name="payment-option" value="payOnArrive" v-model="paymentMethod"><label for="peyonarrive">Payment On Arrive</label></li>
                </ul>
            </div>
            <div class="payment-type-container">
                <template v-if="paymentMethod === 'creditCard'">
<!--                    <stripe-element-card-->
<!--                        ref="elementRef"-->
<!--                        :pk="publishableKey"-->
<!--                        @token="tokenCreated"-->
<!--                    />-->
                    <button class="chosen-room-checkout-btn">
                        Submit Payment
                    </button>
                </template>
                <template v-else>
                    <button class="chosen-room-checkout-btn">
                        Book Now
                    </button>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import BookingMixins from "../../../mixins/booking-mixins";
import { StripeElementCard } from '@vue-stripe/vue-stripe';

let pubKey = process.env.STRIPE_PUBLISHABLE_KEY

export default {
    name: "room-checkout",
    mixins: [BookingMixins],
    components: {
        StripeElementCard
    },
    data () {
        return {
            token: null,
            publishableKey: pubKey
        };
    },
    methods: {
        submit () {
            // this will trigger the process
            this.$refs.elementRef.submit();
        },
        tokenCreated (token) {
            console.log(token);
            // handle the token
            // send it to your server
        },
    }
}
</script>

<style scoped>

</style>
