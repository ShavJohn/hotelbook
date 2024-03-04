<template>
    <modals modal-id="edit-room-interval-price">
        <template #modal-header>
            <h4>Add Room Types</h4>
            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </template>
        <template #modal-body>
            {{ roomTypes[currentRoomTypeKey] }}
            <div class="modal-inputs-container">
                <div class="input-elements">
                    <label class="input-name" for="interval-dates">{{ dateFormat(currentInterval.startDate, 'DD//MM') }} - {{ dateFormat(currentInterval.endDate, 'DD//MM')}}</label>
                    <input type="number" id="interval-dates" placeholder="Enter Room Type price" v-model="currentIntervalPrice">
                </div>
            </div>
        </template>
        <template #modal-footer>
            <button type="button" class="types-table-action-btn btn-bg-yellow"
                    @click="updateIntervalPrice(currentRoomType, currentRoomTypeKey, currentInterval, currentIntervalPrice)">Update</button>
        </template>
    </modals>
</template>

<script>
import Modals from "../../mainComponents/modals";
import roomMixins from "../../../mixins/room-mixin";
export default {
    name: "edit-room-interval-price",
    mixins: [roomMixins],
    components: {Modals},
    props: {
        currentRoomTypeKey: {
            required: true
        },
        currentInterval: {
            required: true
        },
        currentRoomType: {
            required: true
        }
    }
}
</script>

<style scoped>

</style>
