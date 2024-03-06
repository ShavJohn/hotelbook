<template>
    <div class="rooms-booking-chosen-container">
        <div class="chosen-room-image-container">
            <img :src="bookingData.chosenRoom.main_image && imagePrefix +'/' + bookingData.chosenRoom.main_image "/>
            <div class="chosen-room-image-filter"></div>
        </div>
        <div class="date-table">
            <div class="your-reservation">
                <span>{{ $t('your_reservation') }}</span>
            </div>
            <div class="date-square hb-justify-content-between margin-bottom-large">
                <span>{{ $t('check_in') }}</span>
                <div class="rooms-booking-chosen-dates-container">
                    <span class="booking-day">{{ dateFormat(bookingDate.startDate, 'DD') }}</span>
                    <span class="booking-month-year">{{ dateFormat(bookingDate.startDate, 'MMM YYYY') }}</span>
                    <span class="booking-weekday">{{ dateFormat(bookingDate.startDate, 'dddd') }}</span>
                </div>
            </div>
            <div class="date-square hb-justify-content-between margin-bottom-large">
                <span>{{ $t('check_out') }}</span>
                <div class="rooms-booking-chosen-dates-container">
                    <span class="booking-day">{{ dateFormat( bookingDate.endDate , 'DD') }}</span>
                    <span class="booking-month-year">{{ dateFormat( bookingDate.endDate , 'MMM YYYY') }}</span>
                    <span class="booking-weekday">{{ dateFormat( bookingDate.endDate , 'dddd') }}</span>
                </div>
            </div>
            <div class="date-square hb-justify-content-around">
                <span>{{ $t('guests') }}</span>
                <div class="hb-flex hb-align-items-center hb-justify-content-center room-guest-count-container">
                    <span>{{ bookingData.guestCount }}</span>
                </div>
            </div>
            <div class="date-square hb-justify-content-around">
                <span>{{ $t('nights') }}</span>
                <b class="nights-count-styling">{{ parseInt((bookingDate.endDate - bookingDate.startDate) / (1000 * 60 * 60 * 24), 10) }}</b>
            </div>
            <div class="total-mount-of-reservation">
                <span>{{ $t('total') }}</span>
                <span>{{ roomPrice }} ₽</span>
            </div>
        </div>
    </div>
</template>

<script>
import BookingMixins from "../../../../mixins/booking-mixins";

export default {
    name: "chosen-room-date-table",
    mixins: [BookingMixins],
    mounted() {
        if(!Object.keys(this.bookingData.chosenRoom).length) {
            this.$router.push({name: 'RoomSearch'})
        }
    },
    computed: {
        roomType() {
            return this.bookingData.chosenRoom.room_options.find(item => item.type === 'types')
        },
        roomPrice() {
            let price = 0;
            if(Object.keys(this.bookingData.chosenRoom).length) {
                let currentDate = new Date(this.bookingDate.startDate); // Convert to Date object
                let defaultPrice = this.bookingData.chosenRoom[this.localeLang].adult_price;
                const endDate = new Date(this.bookingDate.endDate); // Convert to Date object

                while (currentDate < endDate) {
                    let currentDateFromPriceList = null;

                    if (this.roomType.price_list && this.roomType.price_list.length) {
                        currentDateFromPriceList = this.roomType.price_list.find(item => {
                            const startDate = new Date(item.startDate); // Convert to Date object
                            const endDate = new Date(item.endDate); // Convert to Date object
                            return currentDate >= startDate && currentDate <= endDate;
                        });
                    }

                    if (currentDateFromPriceList) {
                        price += currentDateFromPriceList.price;
                    } else {
                        price += defaultPrice;
                    }

                    // Move to the next day
                    currentDate.setDate(currentDate.getDate() + 1);
                }
            }

            return price;
        }
    }
}
</script>

<style scoped>

</style>
