<template>
    <div class="date-table">
        <div class="date-square hb-justify-content-around margin-bottom-large">
            <span>Check-In</span>
            <div id="start-date-calendar" class="rooms-booking-button-container">
                <Datepicker :locale="localeLang === 'en' ? en : ru" class="cursor-pointer" v-model="bookingDate.startDate" inputFormat="dd" :lowerLimit="today"></Datepicker>
                <div class="dropdown-calendar">
                    <span>{{ dateFormat(bookingDate.startDate, 'MMM') }}</span>
                </div>
            </div>
        </div>
        <div class="date-square hb-justify-content-around margin-bottom-large">
            <span>Check-Out</span>
            <div id="end-date-calendar" class="rooms-booking-button-container">
                <Datepicker :locale="localeLang === 'en' ? en : ru" class="cursor-pointer" v-model="bookingDate.endDate" inputFormat="dd" :lowerLimit="endDayLimit"></Datepicker>
                <div class="dropdown-calendar">
                    <span>{{ dateFormat(bookingDate.endDate, 'MMM') }}</span>
                </div>
            </div>
        </div>
        <div class="date-square hb-justify-content-around">
            <span>Nights</span>
            <b class="nights-count-styling">{{ parseInt((bookingDate.endDate - bookingDate.startDate) / (1000 * 60 * 60 * 24), 10) }}</b>
        </div>
        <div class="book-now-btn-container">
            <button class="book-now-btn" @click="chooseRoom(roomData)">
                Book Now
            </button>
        </div>
    </div>
</template>

<script>
import DropDown from "../../mainComponents/drop-down";
import BookingMixins from "../../../mixins/booking-mixins";
import {enGB, ru} from "date-fns/locale";

export default {
    name: "room-date-table",
    components: {DropDown},
    mixins: [BookingMixins],
    props: {
        roomData: {
            required: true,
        }
    },
    data() {
        return {
            ru: ru,
            en: enGB
        }
    },
}
</script>

<style scoped>

</style>
