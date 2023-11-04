<template>
    <div class="room-page-body">
        <div class="rooms-page-item">
            <h2>{{ roomData[localeLang]?.name }}</h2>
            <slider :images="roomData.additionalImages"/>
            <div class="room-ditaiels-container">
                <font-awesome-icon icon="fa-solid fa-user" />
                <span>{{ roomData.selectedType[localeLang]?.description }}</span>
            </div>
            <div class="room-info-container">
                <p>

                </p>
            </div>
            <div class="room-service-container">

            </div>
        </div>
        <div class="right-menu">
            <room-date-table/>
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
