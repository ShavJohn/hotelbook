<template>
    <div class="room-actions-container">
        <button type="button" class="room-action-btn" @click="openModal('#roomAction')">Add Room</button>
        <button type="button" class="room-action-btn" @click="openModal('#addFeatures')">Features</button>
        <button type="button" class="room-action-btn" @click="openModal('#addServices')">Services</button>
        <button type="button" class="room-action-btn" @click="openModal('#addTypes')">Types</button>
        <button type="button" class="room-action-btn" @click="openModal('#addIntervals')">Add Intervals</button>
        <room-action-modal/>
        <add-features-modal/>
        <add-services-modal/>
        <add-types-modal/>
        <add-intervals-modal/>
    </div>
</template>

<script>
import RoomActionModal from "./room-action-modal";
import AddFeaturesModal from "./add-features-modal"
import AddServicesModal from "./add-services-modal";
import AddTypesModal from "./add-types-modal";
import AddIntervalsModal from "./add-intervals-modal";

export default {
    name: "room-actions",
    components: {AddIntervalsModal, AddTypesModal, AddServicesModal, RoomActionModal, AddFeaturesModal},
    methods: {
        openModal(modalId) {
            if(modalId === '#roomAction') {
                this.$store.commit('rooms/resetRoomData')
            }
            $(modalId).modal("show");
        }
    }
}
</script>

<style scoped>

</style>
