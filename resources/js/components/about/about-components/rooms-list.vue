<template>
    <div class="home-rooms-component-container">
        <div class="all-rooms-btn">
            <h1>All Rooms</h1>
            <button @click="$router.push({name: 'RoomSearch'})">View All</button>
        </div>
        <div class="rooms-list-container">
            <home-room-component price="59" room-name="Deluxe Room" guest-count="3" backgroundImage=""/>
            <home-room-component price="100" room-name="Family Room" guest-count="6" backgroundImage=""/>
            <home-room-component price="28" room-name="Private Room" guest-count="2" backgroundImage=""/>
        </div>
    </div>
</template>

<script>
import HomeRoomComponent from "./home-room-component";
export default {
    name: "rooms-list",
    components: {HomeRoomComponent}
}
</script>

<style scoped>

</style>
