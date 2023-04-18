<template>
    <div class="padding-gigantic bg-light-black hb-flex hb-justify-content-between hb-align-items-end">
        <div class="booking-button-container">
            <label  class="cursor-pointer">
                <p>Check-In</p>
                <VueDatePicker v-model="startDate"></VueDatePicker>
            </label>

        </div>

        <div class="booking-button-container">
            <label class="cursor-pointer">
                <p>Check-Out</p>
                <VueDatePicker v-model="endDate"></VueDatePicker>
            </label>

        </div>

        <div class="booking-button-container">
            <label for="guestCount" class="cursor-pointer">
                <p>Guests</p>
                <div class="booking-button">
                    {{ guestCount }}
                </div>
            </label>
            <input id="guestCount" type="number" class="hidden">
        </div>

        <div class="booking-button-container">
            <button class="booking-button">Check Availability</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "home-booking-component",
    data() {
        return {
            guestCount: 1,
            startDate: '',
            endDate: '',
        }
    },
    created() {
        let date = new Date
    },
    mounted() {

    }
}
</script>

<style scoped>

</style>
