<template>
    <div class="date-table">
        <div class="date-square hb-justify-content-around margin-bottom-large">
            <span>Check-In</span>
            <div id="start-date-calendar" class="rooms-booking-button-container">
                <Datepicker :locale="en" class="cursor-pointer" v-model="startDate" inputFormat="dd" :lowerLimit="today"></Datepicker>
                <div class="dropdown-calendar">
                    <span>{{ dateFormat(startDate, 'MMM') }}</span>
                </div>
            </div>
        </div>
        <div class="date-square hb-justify-content-around margin-bottom-large">
            <span>Check-Out</span>
            <div id="end-date-calendar" class="rooms-booking-button-container">
                <Datepicker class="cursor-pointer" v-model="endDate" inputFormat="dd" :lowerLimit="endDayLimit"></Datepicker>
                <div class="dropdown-calendar">
                    <span>{{ dateFormat(endDate, 'MMM') }}</span>
                </div>
            </div>
        </div>
        <div class="date-square hb-justify-content-around">
            <span>Guests</span>
            <div class="hb-flex hb-align-items-center hb-justify-content-center room-guest-count-container">
                <span>{{ guestCount }}</span>
                <div class="room-guest-count-btn">
                    <button class="btn-strip-default" @click="guestCount++">
                        <font-awesome-icon class="color-white cursor-pointer" icon="fa-solid fa-chevron-up" />
                    </button>
                    <button class="btn-strip-default" @click="guestCount !== 1 && guestCount--">
                        <font-awesome-icon class="color-white cursor-pointer" icon="fa-solid fa-chevron-down" />
                    </button>
                </div>
            </div>
        </div>
        <div class="date-square hb-justify-content-around">
            <span>Nights</span>
            <b class="nights-count-styling">{{ parseInt((endDate - startDate) / (1000 * 60 * 60 * 24), 10) }}</b>
        </div>
    </div>
</template>

<script>
import BookingMixins from "../../../../mixins/booking-mixins";
import DropDown from "../../../mainComponents/drop-down";
import { enGB, ru } from 'date-fns/locale'

export default {
    name: "date-table",
    components: {DropDown},
    mixins: [BookingMixins],
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
