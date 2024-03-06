<template>
    <div class="booking-room-container">
        <div class="room-image">
            <img :src="`${imagePrefix}/${roomData.main_image}`"/>
            <div class="room-status" :class="roomData.busy ? 'busy' : 'available'">
                <span>{{ roomData.busy ? $t('busy') : $t('available') }}</span>
            </div>
        </div>
        <div class="room-info-card">
            <div class="room-info-container">
                <div class="room-info-inner">
                    <h2>{{ roomData[localeLang].name }}</h2>
                    <div class="room-guest-count">
                        <font-awesome-icon icon="fa-solid fa-user" />
                        <span>{{ roomType[localeLang].description }}</span>
                    </div>
                </div>
                <p v-html="roomData[localeLang].description" class="trim-room-desc"></p>
                <button v-if="!roomData.busy" @click="chooseRoom(roomData)">
                    <span>{{ $t('book_now_for') }} {{ roomPrice }} ₽</span>
                </button>
            </div>
            <div class="room-features">
                <div class="room-feature-delimiter"></div>
                <div class="feature-icons">

                </div>
                <button @click="checkRoomIfBusy(roomData.busy)"><router-link :to="{ name: 'Room', params: { room: roomData.id}}">{{ $t('full_info') }}</router-link></button>
            </div>
        </div>
    </div>
</template>

<script>
import bookingMixins from "../../../../mixins/booking-mixins"

export default {
    name: "room-component",
    props: {
        roomData: {
            required: true
        }
    },
    mixins: [bookingMixins],
    computed: {
        roomType() {
            return this.roomData.room_options.find(item => item.type === 'types')
        },
        roomPrice() {
            let price = 0;
            let currentDate = new Date(this.bookingDate.startDate); // Convert to Date object
            let defaultPrice = this.roomData[this.localeLang].adult_price;
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

            return price;
        }
    }

}
</script>

<style scoped>

</style>
