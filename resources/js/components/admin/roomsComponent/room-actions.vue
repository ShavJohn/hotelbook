<template>
    <div class="room-actions-container">
        <button class="room-action-btn" @click="openAddRoomModal()">Add Room</button>
        <button class="room-action-btn">Add Features</button>
        <button class="room-action-btn">Add Services</button>
        <button class="room-action-btn">Add Types</button>
        <room-action-modal/>
    </div>
</template>

<script>
import RoomActionModal from "./room-action-modal";
export default {
    name: "room-actions",
    components: {RoomActionModal},
    methods: {
        openAddRoomModal() {
            $("#roomAction").modal("show");
        }
    }
}
</script>

<style scoped>

</style>
