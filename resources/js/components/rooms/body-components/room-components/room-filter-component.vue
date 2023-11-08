<template>
    <div class="rooms-filter-container">
        <label for="range"><span>Max Night Price:</span> <span>{{ bookingPrice }} $</span></label>
        <input type="range" id="range" name="range" min="0" max="1000" v-model="bookingPrice">
        <div class="room-features-container">
            <button @click="openFeaturesMenu = !openFeaturesMenu">
                <span>Room Features:</span>
                <font-awesome-icon v-if="openFeaturesMenu" icon="fa-solid fa-chevron-up" />
                <font-awesome-icon v-else icon="fa-solid fa-chevron-down" />
            </button>
            <ul class="room-features-menu" :class="openFeaturesMenu && 'open-features-menu'">
                <li v-for="roomFeature in roomFeatures">
                    <input type="checkbox" :id="roomFeature.type" :name="roomFeature.type" @change="tuggleData(roomFeature)">
                    <label :for="roomFeature.type">{{ roomFeature[localeLang].name }}</label>
                </li>
            </ul>
        </div>
        <div class="room-features-container">
            <button @click="openServicesMenu = !openServicesMenu">
                <span>Room Services:</span>
                <font-awesome-icon v-if="openServicesMenu" icon="fa-solid fa-chevron-up" />
                <font-awesome-icon v-else icon="fa-solid fa-chevron-down" />
            </button>
            <ul class="room-features-menu" :class="openServicesMenu && 'open-features-menu'">
                <li v-for="roomService in roomServices">
                    <input type="checkbox" :id="roomService.type" :name="roomService.type" @change="tuggleData(roomService)">
                    <label :for="roomService.type">{{ roomService[localeLang].name }}</label>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import BookingMixins from "../../../../mixins/booking-mixins";
import roomMixins from "../../../../mixins/room-mixin";

export default {
    name: "room-filter-component",
    mixins: [BookingMixins, roomMixins],
}
</script>

<style scoped>

</style>
