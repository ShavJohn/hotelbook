<template>
    <div class="booking-room-container">
        <div class="room-image">
            <img :src="`${imagePrefix}/${roomData.main_image}`"/>
            <div class="room-status" :class="roomData.busy ? 'busy' : 'available'">
                <span>{{ roomData.busy ? 'Busy' : 'Available' }}</span>
            </div>
        </div>
        <div class="room-info-card">
            <div class="room-info-container">
                <h2>{{ roomData[localeLang].name }}</h2>
                <div class="room-guest-count">
                    <font-awesome-icon icon="fa-solid fa-user" />
                    <span>{{ roomType[localeLang].description }}</span>
                </div>
                <p>{{ roomData[localeLang].description }}</p>
                <button v-if="!roomData.busy" @click="chooseRoom(roomData)">
                    <span>Book Now For {{ roomData[localeLang].adult_price }} $</span>
                </button>
            </div>
            <div class="room-features">
                <div class="room-feature-delimiter"></div>
                <div class="feature-icons">

                </div>
                <button><router-link :to="{ name: 'Room', params: { room: roomData.id}}">Full Info </router-link></button>
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

    }

}
</script>

<style scoped>

</style>
