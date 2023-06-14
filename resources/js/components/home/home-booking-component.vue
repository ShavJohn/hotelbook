<template>
    <div id="bookingInputsContainer" class="padding-gigantic bg-light-black">
        <div id="bookingInputs" class="hb-flex hb-justify-content-between hb-align-items-end hb-flex-wrap">
            <div class="booking-button-container">
                <label  class="cursor-pointer">
                    <p>{{ $t('check_in') }}</p>
                    <Datepicker class="cursor-pointer" v-model="startDate" inputFormat="dd MMM" :lowerLimit="today"></Datepicker>
                </label>
            </div>
            <div class="booking-button-container">
                <label class="cursor-pointer">
                    <p>{{ $t('check_out')}}</p>
                    <Datepicker class="cursor-pointer" v-model="endDate" inputFormat="dd MMM" :lowerLimit="endDayLimit"></Datepicker>
                </label>
            </div>
            <div class="booking-button-container">
                <label class="hb-width-100">
                    <p>{{ $t('guests') }}</p>
                    <div class="booking-button hb-flex hb-justify-content-between">
                        {{ guestCount }}
                        <div>
                            <button class="btn-strip-default" @click="guestCount++">
                                <font-awesome-icon class="color-white cursor-pointer margin-right" icon="fa-solid fa-chevron-up" />
                            </button>
                            <button class="btn-strip-default" @click="guestCount !== 1 && guestCount--">
                                <font-awesome-icon class="color-white cursor-pointer" icon="fa-solid fa-chevron-down" />
                            </button>
                        </div>
                    </div>
                </label>
            </div>

            <div class="booking-button-container">
                <div class="booking-button cursor-pointer">
                    <button class="cursor-pointer">{{ $t('check_availability') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const today = new Date();
    const tomorrow = new Date();
    today.setHours(0, 0, 0, 0)
    tomorrow.setHours(0, 0, 0, 0)
    tomorrow.setDate(today.getDate()+1);

    export default {
        name: "home-booking-component",
        data() {
            return {
                guestCount: 1,
                today: today,
                startDate: today,
                endDate: tomorrow,
                endDayLimit: tomorrow,
                animationStarted: false
            }
        },
        watch: {
            startDate(val) {
                if(val >= this.endDate) {
                    let currentDate = new Date(val)
                    this.endDate = currentDate.setDate(currentDate.getDate()+1)
                    this.endDate = new Date(this.endDate)
                }
                this.endDayLimit = this.endDayLimit.setDate(this.startDate.getDate()+1)
                this.endDayLimit = new Date(this.endDayLimit)
            }
        },
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
        created() {

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
