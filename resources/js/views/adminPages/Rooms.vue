<template>
    <div class="rooms-panel-container">
        <room-actions/>
        <room-type-price-list/>
        <rooms-table/>
    </div>
</template>

<script>
import RoomsTable from "../../components/admin/roomsComponent/rooms-table";
import RoomActions from "../../components/admin/roomsComponent/room-actions";
import RoomTypePriceList from "../../components/admin/roomsComponent/room-type-price-list";
export default {
    name: "Rooms",
    components: {RoomTypePriceList, RoomActions, RoomsTable},
    mounted() {
        this.$store.dispatch('rooms/getRoomFST')
    }
}
</script>

<style scoped>

</style>
