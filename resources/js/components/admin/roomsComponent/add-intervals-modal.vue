<template>
    <modals modal-id="addIntervals">
        <template #modal-header>
            <h4>Add Interval Dates</h4>
            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </template>
        <template #modal-body>
            <div class="decreasing-modal-height">
                <div class="price-list-interval-container">
                    <div class="price-list-interval-item">
                        <label for="start-date">Start Date</label>
                        <input type="date" id="start-date" v-model="interval.startDate">
                    </div>
                    <div class="price-list-interval-item">
                        <label for="end-date">End Date</label>
                        <input type="date" id="end-date" v-model="interval.endDate">
                    </div>
                    <div class="price-list-interval-btn-container">
                        <button class="add-interval-btn" @click="addPricingInterval()">Add Interval</button>
                    </div>
                </div>
                <div class="intervals-list">
                    <div class="price-list-interval-container" v-for="(priceListInterval, key) in priceListIntervals.json_value">
                        <div class="price-list-interval-item">
                            <label :for="`start-date-${key}`">Start Date</label>
                            <input type="date" :id="`start-date-${key}`" v-model="priceListInterval.startDate">
                        </div>
                        <button class="delete-btn" @click="removeInterval(key)"><font-awesome-icon icon="fa-solid fa-trash" /></button>
                        <div class="price-list-interval-item">
                            <label :for="`end-date-${key}`">End Date</label>
                            <input type="date" :id="`end-date-${key}`" v-model="priceListInterval.endDate">
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #modal-footer>
            <button type="button" data-bs-dismiss="modal" aria-label="Close" class="modal-btn btn-grey close">Close</button>
            <button class="modal-btn btn-action" @click="updateIntervals()">Update</button>
        </template>
    </modals>
</template>

<script>
import Modals from "../../mainComponents/modals";
import roomMixins from "../../../mixins/room-mixin";
export default {
    name: "add-intervals-modal",
    components: {Modals},
    mixins: [roomMixins],
}
</script>

<style scoped>

</style>
