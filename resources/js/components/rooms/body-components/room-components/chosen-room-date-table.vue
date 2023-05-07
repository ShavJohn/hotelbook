<template>
    <div class="rooms-booking-chosen-container">
        <div class="chosen-room-image-container">
            <img src="http://www.nicdarkthemes.com/themes/hotel-inn/wp/demo/inn-suites/wp-content/uploads/sites/2/2021/12/parallax-26.jpg"/>
            <div class="chosen-room-image-filter"></div>
        </div>
        <div class="date-table">
            <div class="your-reservation">
                <span>Your Reservation</span>
            </div>
            <div class="date-square hb-justify-content-between margin-bottom-large">
                <span>Check-In</span>
                <div class="rooms-booking-chosen-dates-container">
                    <span class="booking-day">{{ dateFormat(startDate, 'DD') }}</span>
                    <span class="booking-month-year">{{ dateFormat(startDate, 'MMM YYYY') }}</span>
                    <span class="booking-weekday">{{ dateFormat(startDate, 'dddd') }}</span>
                </div>
            </div>
            <div class="date-square hb-justify-content-between margin-bottom-large">
                <span>Check-Out</span>
                <div class="rooms-booking-chosen-dates-container">
                    <span class="booking-day">{{ dateFormat( endDate , 'DD') }}</span>
                    <span class="booking-month-year">{{ dateFormat( endDate , 'MMM YYYY') }}</span>
                    <span class="booking-weekday">{{ dateFormat( endDate , 'dddd') }}</span>
                </div>
            </div>
            <div class="date-square hb-justify-content-around">
                <span>Guests</span>
                <div class="hb-flex hb-align-items-center hb-justify-content-center room-guest-count-container">
                    <span>{{ guestCount }}</span>
                </div>
            </div>
            <div class="date-square hb-justify-content-around">
                <span>Nights</span>
                <b class="nights-count-styling">{{ parseInt((endDate - startDate) / (1000 * 60 * 60 * 24), 10) }}</b>
            </div>
            <div class="total-mount-of-reservation">
                <span>Total</span>
                <span>50 $</span>
            </div>
        </div>
    </div>
</template>

<script>
import BookingMixins from "../../../../mixins/booking-mixins";

export default {
    name: "chosen-room-date-table",
    mixins: [BookingMixins],
}
</script>

<style scoped>

</style>
