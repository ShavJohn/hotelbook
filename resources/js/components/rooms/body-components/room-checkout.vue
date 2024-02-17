<template>
    <div  class="room-book-container">
        <div class="your-information-container">
            <button class="back-page-btn" @click="goToPage('RoomBook')">
                <font-awesome-icon icon="fa-solid fa-arrow-left" />
            </button>
            <h2>{{ $t('add_your_information') }}</h2>
            <ul>
                <li><span>{{ $t('name') }}:</span><span>{{ bookingData.guestData.name }}</span></li>
                <li><span>{{ $t('lastname') }}:</span><span>{{ bookingData.guestData.lastname }}</span></li>
                <li><span>{{ $t('email') }}:</span><span>{{ bookingData.guestData.email }}</span></li>
                <li><span>{{ $t('phone') }}:</span><span>{{ bookingData.guestData.phone }}</span></li>
                <li><span>{{ $t('address') }}:</span><span>{{ bookingData.guestData.address }}</span></li>
                <li><span>{{ $t('city') }}:</span><span>{{ bookingData.guestData.city }}</span></li>
                <li><span>{{ $t('country') }}:</span><span>{{ bookingData.guestData.country }}</span></li>
                <li><span>{{ $t('check_in') }}:</span><span>{{ bookingData.guestData.checkIn }}</span></li>
                <li><span>{{ $t('check_out') }}:</span><span>{{ bookingData.guestData.checkOut }}</span></li>
                <li><span>{{ $t('message') }}:</span><span>{{ bookingData.guestData.message }}</span></li>
            </ul>
            <h3>{{ $t('extra_services') }}:</h3>
            <div class="extra-services-tag-container">
                <span v-for="extraService in bookingData.guestData.extraServices">{{ extraService[localeLang].name }}</span>
            </div>
        </div>
        <div class="payment-option">
<!--            <h2>Payment Option</h2>-->
<!--            <div class="payment-type-option-menu">-->
<!--                <ul>-->
<!--                    <li><input id="creditcard" type="radio" name="payment-option" value="creditCard" v-model="paymentMethod"><label for="creditcard">Credit Card</label></li>-->
<!--                    <li><input id="peyonarrive" type="radio" name="payment-option" value="payOnArrive" v-model="paymentMethod"><label for="peyonarrive">Payment On Arrive</label></li>-->
<!--                </ul>-->
<!--            </div>-->
<!--            <div class="payment-type-container">-->
<!--                <template v-if="paymentMethod === 'creditCard'">-->
<!--                    <button class="chosen-room-checkout-btn">-->
<!--                        Submit Payment-->
<!--                    </button>-->
<!--                </template>-->
<!--                <template v-else>-->
<!--                    -->
<!--                </template>-->
<!--            </div>-->
        </div>
        <modals modal-id="terms-and-conditions">
            <template #modal-header>
                <h4>{{ $t('terms_and_conditions') }}</h4>
                <div>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </template>
            <template #modal-body>
                <div class="terms-and-conditions-container">
                    <div class="terms-and-conditions-text" v-html="termsAndConditions.json_value[localeLang]"></div>
                    <div class="terms-and-conditions-input">
                        <input type="checkbox" id="agree-to-conditions" name="agree-to-conditions" v-model="termsAndConditionsCheckBox">
                        <label for="agree-to-conditions">
                            {{ $t('agree_to_terms_and_conditions') }}
                        </label>
                    </div>
                </div>
            </template>
            <template #modal-footer>
                <button type="button" data-bs-dismiss="modal" aria-label="Close" class="modal-btn btn-grey close">{{ $t('close') }}</button>
                <button type="button" class="modal-btn btn-action" @click="confirmTermsAndConditions()">{{ $t('confirm') }}</button>
            </template>
        </modals>
        <button class="chosen-room-checkout-btn" @click="bookRoom()">
            {{ $t('book_now') }}
        </button>
    </div>
</template>

<script>
import BookingMixins from "../../../mixins/booking-mixins";
import { StripeElementCard } from '@vue-stripe/vue-stripe';
import Modals from "../../mainComponents/modals";


let pubKey = process.env.STRIPE_PUBLISHABLE_KEY

export default {
    name: "room-checkout",
    mixins: [BookingMixins],
    components: {
        Modals,
        StripeElementCard
    },
    methods: {
        submit () {
            // this will trigger the process
            this.$refs.elementRef.submit();
        },
    },
    mounted() {
        if(!Object.keys(this.bookingData.chosenRoom).length) {
            this.$router.push({name: 'RoomSearch'})
        }
    }
}
</script>

<style scoped>

</style>
