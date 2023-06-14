<template>
    <div class="rooms-panel-container">
        <room-actions/>
        <rooms-table/>
    </div>
</template>

<script>
import RoomsTable from "../../components/admin/roomsComponent/rooms-table";
import RoomActions from "../../components/admin/roomsComponent/room-actions";
export default {
    name: "Rooms",
    components: {RoomActions, RoomsTable}
}
</script>

<style scoped>

</style>
