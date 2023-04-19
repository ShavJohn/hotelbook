<template>
    <div class="padding-gigantic bg-light-black hb-flex hb-justify-content-between hb-align-items-end hb-flex-wrap">
        <div class="booking-button-container">
            <label  class="cursor-pointer">
                <p>Check-In</p>
                <Datepicker class="cursor-pointer" v-model="startDate" inputFormat="dd MMM" :lowerLimit="today"></Datepicker>
            </label>

        </div>

        <div class="booking-button-container">
            <label class="cursor-pointer">
                <p>Check-Out</p>
                <Datepicker class="cursor-pointer" v-model="endDate" inputFormat="dd MMM" :lowerLimit="endDate"></Datepicker>
            </label>

        </div>

        <div class="booking-button-container">
            <label>
                <p>Guests</p>
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
                <button class="cursor-pointer">Check Availability</button>
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
        created() {

        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
