<template>
    <div>
        <room-header/>
        <rooms-body/>
    </div>
</template>

<script>
import RoomHeader from "../components/rooms/room-header";
import RoomsBody from "../components/rooms/rooms-body";
export default {
    name: "Rooms",
    components: {RoomsBody, RoomHeader}
}
</script>

<style scoped>

</style>
