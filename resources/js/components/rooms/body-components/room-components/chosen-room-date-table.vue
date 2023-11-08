<template>
    <div class="rooms-booking-chosen-container">
        <div class="chosen-room-image-container">
            <img :src="bookingData.chosenRoom.main_image && imagePrefix +'/' + bookingData.chosenRoom.main_image "/>
            <div class="chosen-room-image-filter"></div>
        </div>
        <div class="date-table">
            <div class="your-reservation">
                <span>Your Reservation</span>
            </div>
            <div class="date-square hb-justify-content-between margin-bottom-large">
                <span>Check-In</span>
                <div class="rooms-booking-chosen-dates-container">
                    <span class="booking-day">{{ dateFormat(bookingDate.startDate, 'DD') }}</span>
                    <span class="booking-month-year">{{ dateFormat(bookingDate.startDate, 'MMM YYYY') }}</span>
                    <span class="booking-weekday">{{ dateFormat(bookingDate.startDate, 'dddd') }}</span>
                </div>
            </div>
            <div class="date-square hb-justify-content-between margin-bottom-large">
                <span>Check-Out</span>
                <div class="rooms-booking-chosen-dates-container">
                    <span class="booking-day">{{ dateFormat( bookingDate.endDate , 'DD') }}</span>
                    <span class="booking-month-year">{{ dateFormat( bookingDate.endDate , 'MMM YYYY') }}</span>
                    <span class="booking-weekday">{{ dateFormat( bookingDate.endDate , 'dddd') }}</span>
                </div>
            </div>
            <div class="date-square hb-justify-content-around">
                <span>Guests</span>
                <div class="hb-flex hb-align-items-center hb-justify-content-center room-guest-count-container">
                    <span>{{ bookingData.guestCount }}</span>
                </div>
            </div>
            <div class="date-square hb-justify-content-around">
                <span>Nights</span>
                <b class="nights-count-styling">{{ parseInt((bookingDate.endDate - bookingDate.startDate) / (1000 * 60 * 60 * 24), 10) }}</b>
            </div>
            <div class="total-mount-of-reservation">
                <span>Total</span>
                <span>{{ (bookingData?.chosenRoom[localeLang]?.adult_price ? bookingData.chosenRoom[localeLang].adult_price : 1) * daysCount}}$</span>
            </div>
        </div>
    </div>
</template>

<script>
import BookingMixins from "../../../../mixins/booking-mixins";

export default {
    name: "chosen-room-date-table",
    mixins: [BookingMixins],
    computed: {
        daysCount() {
            return parseInt((this.bookingDate.endDate - this.bookingDate.startDate) / (1000 * 60 * 60 * 24), 10)
        }
    }
}
</script>

<style scoped>

</style>
