<template>
    <div class="room-body-padding hb-flex hb-flex-wrap hb-justify-content-between">
        <div class="left-menu">
            <template v-if="$route.name == 'RoomSearch'">
                <date-table/>
                <room-filter-component/>
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
export default {
    name: "rooms-body",
    components: {ChosenRoomDateTable, RoomFilterComponent, DateTable},
    mounted() {

    }
}
</script>

<style scoped>

</style>
