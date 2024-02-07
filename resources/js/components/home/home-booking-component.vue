<template>
    <div id="bookingInputsContainer" class="padding-gigantic bg-light-black">
        <div id="bookingInputs" class="hb-flex hb-justify-content-between hb-align-items-end hb-flex-wrap">
            <div class="booking-button-container">
                <label  class="cursor-pointer">
                    <p>{{ $t('check_in') }}</p>
                    <Datepicker class="cursor-pointer" v-model="bookingDate.startDate" inputFormat="dd MMM" :lowerLimit="today"></Datepicker>
                </label>
            </div>
            <div class="booking-button-container">
                <label class="cursor-pointer">
                    <p>{{ $t('check_out')}}</p>
                    <Datepicker class="cursor-pointer" v-model="bookingDate.endDate" inputFormat="dd MMM" :lowerLimit="endDayLimit"></Datepicker>
                </label>
            </div>
            <div class="booking-button-container">
                <label class="hb-width-100">
                    <p>{{ $t('guests') }}</p>
                    <div class="booking-button hb-flex hb-justify-content-between">
                        {{ bookingData.guestCount }}
                        <div>
                            <button class="btn-strip-default" @click="bookingData.guestCount++">
                                <font-awesome-icon class="color-white cursor-pointer margin-right" icon="fa-solid fa-chevron-up" />
                            </button>
                            <button class="btn-strip-default" @click="bookingData.guestCount !== 1 && bookingData.guestCount--">
                                <font-awesome-icon class="color-white cursor-pointer" icon="fa-solid fa-chevron-down" />
                            </button>
                        </div>
                    </div>
                </label>
            </div>

            <div class="booking-button-container">
                <div class="booking-button cursor-pointer">
                    <button class="cursor-pointer" @click="checkAvailability(bookingDate.startDate, bookingDate.endDate, bookingData.guestCount)">{{ $t('check_availability') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import bookingMixins from "../../mixins/booking-mixins";

    export default {
        name: "home-booking-component",
        mixins: [bookingMixins],
        methods: {
            animateBookingInputs() {
                this.animationStarted = true
                let bookingInputs = document.getElementById('bookingInputs')
                let bookingInputsContainer =  document.getElementById('bookingInputsContainer')
                let scrollReach = window.innerHeight

               if(!this.animationStarted && bookingInputsContainer && bookingInputsContainer.getBoundingClientRect().top <= scrollReach) {
                   bookingInputs.style.animation = 'booking-inputs-appear 2s'
                   removeEventListener('scroll', this.animateBookingInputs)
               }
            }
        },
        mounted() {
            let bookingInputsContainer =  document.getElementById('bookingInputsContainer')
            let scrollReach = window.innerHeight

            if(bookingInputsContainer && bookingInputsContainer.getBoundingClientRect().top <= scrollReach) {
                this.animateBookingInputs()
            }
            if(!this.animationStarted) {
                window.addEventListener('scroll',  this.animateBookingInputs)
            }
        }
    }
</script>

<style scoped>

</style>
