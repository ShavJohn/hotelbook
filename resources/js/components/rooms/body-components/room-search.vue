<template>
    <div class="rooms-list">
        <room-component v-for="roomData in roomsData" :room-data="roomData"/>
        <div class="hb-flex hb-justify-content-center navigation-btn-container">
            <ul>
                <li v-for="page in visiblePages" :class="page === currentPage && 'active-room-page'" @click="currentPage = page">{{ page }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import RoomComponent from "./room-components/room-component";
import roomMixins from "../../../mixins/room-mixin";

export default {
    name: "room-search",
    components: {RoomComponent},
    methods: {

    },
    mixins: [roomMixins],
}
</script>

<style scoped>

</style>
