<template>
    <div class="home-rooms-component-container">
        <div class="all-rooms-btn">
            <h1>{{ $t('all_rooms') }}</h1>
            <button @click="$router.push({name: 'RoomSearch'})">{{ $t('view_all') }}</button>
        </div>
        <div class="rooms-list-container">
            <home-room-component v-for="topRoom in topRooms" :price="topRoom[localeLang].adult_price"
                                 :room-name="topRoom[localeLang].name"
                                 :backgroundImage="topRoom.main_image"/>
        </div>
    </div>
</template>

<script>
import HomeRoomComponent from "./home-room-component";
import aboutUsMixins from "../../../mixins/about-us-mixins";
export default {
    name: "rooms-list",
    components: {HomeRoomComponent},
    mixins: [aboutUsMixins],
    mounted() {
        this.getAllData()
    }
}
</script>

<style scoped>

</style>
