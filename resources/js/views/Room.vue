<template>
    <div>
        <room-page-header/>
        <room-body/>
    </div>
</template>

<script>
import RoomBody from "../components/room/room-body";
import RoomPageHeader from "../components/room/room-page-header";
export default {
    name: "Room",
    components: {RoomPageHeader, RoomBody}
}
</script>

<style scoped>

</style>
