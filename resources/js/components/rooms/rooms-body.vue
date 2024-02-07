<template>
    <div class="room-body-padding hb-flex hb-flex-wrap hb-justify-content-between">
        <div class="left-menu">
            <template v-if="$route.name == 'RoomSearch'">
                <date-table/>
                <button class="btn bg-dark-yellow color-white margin-top-large hb-width-100" @click="checkAvailability(bookingDate.startDate, bookingDate.endDate, bookingData.guestCount)">{{ $t('check_availability') }}</button>
<!--                <room-filter-component/>-->
            </template>
            <chosen-room-date-table v-else/>
        </div>
       <router-view></router-view>
    </div>
</template>

<script>
import DateTable from "./body-components/room-components/date-table";
import RoomFilterComponent from "./body-components/room-components/room-filter-component";
import ChosenRoomDateTable from "./body-components/room-components/chosen-room-date-table";
import bookingMixins from "../../mixins/booking-mixins";
export default {
    name: "rooms-body",
    components: {ChosenRoomDateTable, RoomFilterComponent, DateTable},
    mixins: [bookingMixins],
}
</script>

<style scoped>

</style>
