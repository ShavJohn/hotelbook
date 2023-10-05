<template>
    <div class="rooms-table-container">
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th class="hide-on-mobile">Number</th>
                    <th>Image</th>
                    <th class="hide-on-large-tablet">Name</th>
                    <th class="hide-on-large-tablet hide-on-laptop">Type</th>
                    <th class="hide-on-large-tablet hide-on-laptop">Features</th>
                    <th class="hide-on-large-tablet hide-on-laptop">Services</th>
                    <th class="hide-on-tablet">Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="!tableContentLoader" v-for="(roomData, key) in roomsData">
                    <td>{{ key = (key +1) + skip }}</td>
                    <td class="hide-on-mobile">{{ roomData.number }}</td>
                    <td><img :src="`${imagePrefix}/${roomData.main_image}`"></td>
                    <td class="hide-on-large-tablet">{{ roomData[dataLang].name }}</td>
                    <td class="hide-on-large-tablet hide-on-laptop">{{ displayType(roomData.room_options)[dataLang].name }}</td>
                    <td class="hide-on-large-tablet hide-on-laptop"><div class="tag-container"><span v-for="feature in displayFeatures(roomData.room_options)" class="custom-tag">{{ feature[dataLang].name }}</span></div></td>
                    <td class="hide-on-large-tablet hide-on-laptop"><div class="tag-container"><span v-for="service in displayServices(roomData.room_options)" class="custom-tag">{{ service[dataLang].name }}</span></div></td>
                    <td class="hide-on-tablet">Available</td>
                    <td>
                        <button type="button" class="room-table-action-btn btn-bg-yellow" @click="openRoomEditModal(roomData)">Edit</button>
                        <button type="button" class="room-table-action-btn btn-bg-red" @click="openRemoveRoomModal(roomData.id)">Remove</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="tableContentLoader" class="leader-animation">
            <div class="spinner-border loader-style" role="status">
                <span class="sr-only"></span>
            </div>
        </div>
        <div class="hb-flex hb-justify-content-center margin-top">
            <button type="button" class="room-table-action-btn btn-bg-yellow" @click="changePage('prev')">Previous</button>
            <button type="button" class="room-table-action-btn btn-bg-yellow" @click="changePage('next')">Next</button>
        </div>
        <remove-room-modal :removeRoomNum="removeRoomId"/>
    </div>
</template>

<script>
import roomMixins from "../../../mixins/room-mixin"
import RemoveRoomModal from "./remove-room-modal";

export default {
    name: "rooms-table",
    components: {RemoveRoomModal},
    mixins: [roomMixins],
    mounted() {
        this.getRooms()
    }

}
</script>

<style scoped>

</style>
