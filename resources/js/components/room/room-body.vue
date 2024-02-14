<template>
    <div class="room-page-body">
        <div class="rooms-page-item">
            <slider :images="roomData.additionalImages"/>
            <h2>{{ roomData[localeLang]?.name }}</h2>
            <div class="room-ditaiels-container">
                <font-awesome-icon icon="fa-solid fa-user" />
                <span>{{ roomData.selectedType[localeLang]?.description }}</span>
            </div>
            <div class="room-options-container">
                <div class="room-option-item">
                    {{ roomData.selectedType[localeLang]?.name }}
                </div>
                <div v-if="roomData.selectedFeatures.length" class="room-option-item" v-for="roomFeature in roomData.selectedFeatures">
                    {{ roomFeature[localeLang]?.name }}
                </div>
                <div v-if="roomData.selectedServices.length" class="room-option-item" v-for="roomService in roomData.selectedServices">
                    {{ roomService[localeLang]?.name }}
                </div>
            </div>
            <div class="room-info-container">
                <p v-html="roomData[localeLang].description"></p>
            </div>
        </div>
        <div v-if="!roomBusy" class="right-menu">
            <room-date-table :roomData="roomData"/>
        </div>
    </div>
</template>

<script>
import RoomDateTable from "./room-components/room-date-table";
import Slider from "../mainComponents/slider";
import roomMixins from "../../mixins/room-mixin";
export default {
    name: "room-body",
    components: {Slider, RoomDateTable},
    mixins: [roomMixins],
}
</script>

<style scoped>

</style>
