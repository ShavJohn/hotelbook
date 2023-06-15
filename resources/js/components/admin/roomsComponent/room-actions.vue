<template>
    <div class="room-actions-container">
        <button class="room-action-btn" @click="openModal('#roomAction')">Add Room</button>
        <button class="room-action-btn" @click="openModal('#addFeatures')">Add Features</button>
        <button class="room-action-btn" @click="openModal('#addServices')">Add Services</button>
        <button class="room-action-btn" @click="openModal('#addTypes')">Add Types</button>
        <room-action-modal/>
        <add-features-modal/>
        <add-services-modal/>
        <add-types-modal/>
    </div>
</template>

<script>
import RoomActionModal from "./room-action-modal";
import AddFeaturesModal from "./add-features-modal"
import AddServicesModal from "./add-services-modal";
import AddTypesModal from "./add-types-modal";

export default {
    name: "room-actions",
    components: {AddTypesModal, AddServicesModal, RoomActionModal, AddFeaturesModal},
    methods: {
        openModal(modalId) {
            $(modalId).modal("show");
        }
    }
}
</script>

<style scoped>

</style>
