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
                    <Datepicker class="cursor-pointer" v-model="endDate" inputFormat="dd MMM" :lowerLimit="endDate"></Datepicker>
                </label>

            </div>

            <div class="booking-button-container">
                <label>
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
    tomorrow.setDate(today.getDate()+1);

    export default {
        name: "home-booking-component",
        data() {
            return {
                guestCount: 1,
                today: today,
                startDate: today,
                endDate: tomorrow,
            }
        },
        watch: {
            startDate(val) {
                if(val >= this.endDate) {
                    this.endDate = val
                }
            }
        },
        methods: {
            animateBookingInputs() {
                let bookingInputs = document.getElementById('bookingInputs')
                let bookingInputsContainer =  document.getElementById('bookingInputsContainer').getBoundingClientRect()
                let scrollReach = window.innerHeight

               if(bookingInputsContainer.top <= scrollReach) {
                   bookingInputs.style.animation = 'booking-inputs-appear 2s'
                   removeEventListener('scroll', this.animateBookingInputs)
               }
            }
        },
        created() {

        },
        mounted() {
            this.animateBookingInputs()
            window.addEventListener('scroll',  () => {
                this.animateBookingInputs()
            })
        }
    }
</script>

<style scoped>

</style>
