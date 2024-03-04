<template>
    <div class="room-type-price-list-container">
        <table v-if="roomTypes && roomTypes.length">
            <thead>
                <tr>
                    <th>
                        Room Types
                    </th>
                    <th v-if="priceListIntervals.json_value && priceListIntervals.json_value.length"
                        v-for="priceListInterval in priceListIntervals.json_value">
                        {{ dateFormat(priceListInterval.startDate, 'DD//MM') }} - {{ dateFormat(priceListInterval.endDate, 'DD/MM') }}
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(type, key) in roomTypes">
                    <td>
                        {{ type[dataLang].name }}
                    </td>
                    <td  v-for="priceListInterval in priceListIntervals.json_value"
                         class="cursor-pointer"
                         @click="openEditIntervalModal(type, key, priceListInterval)">
                        <template v-if="type.price_list && type.price_list.length"
                                  v-for="interval in type.price_list">
                                <template v-if="interval.startDate === priceListInterval.startDate && interval.endDate === priceListInterval.endDate">
                                    {{ interval.price }}
                                </template>
                        </template>
                    </td>
                    <td class="types-table-action-btn-container">
                        <button type="button" class="types-table-action-btn btn-bg-red"  @click="removeSFTItem('types', type.id, key)">Remove</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <edit-room-interval-price :currentRoomType="currentRoomType" :currentInterval="currentInterval" :currentRoomTypeKey="currentRoomTypeKey"/>
    </div>
</template>

<script>
import roomMixins from "../../../mixins/room-mixin";
import EditRoomIntervalPrice from "./edit-room-interval-price";

export default {
    name: "room-type-price-list",
    data() {
        return {
            currentInterval: {},
            currentRoomTypeKey: 0,
            currentRoomType: {},
        }
    },
    components: {EditRoomIntervalPrice},
    mixins: [roomMixins],
    methods: {
        openEditIntervalModal(currentRoomType, currentRoomTypeKey, currentInterval) {
            this.currentInterval = currentInterval
            this.currentRoomTypeKey = currentRoomTypeKey
            this.currentRoomType = currentRoomType
            $('#edit-room-interval-price').modal('show')
        }
    }
}
</script>

<style scoped>

</style>
