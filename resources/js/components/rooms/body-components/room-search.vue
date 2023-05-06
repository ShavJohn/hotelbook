<template>
    <div class="rooms-list">
        <room-component :price="36" room-name="Private Room" :guest-count="3"/>
        <room-component :price="36" room-name="Private Room" :guest-count="3"/>
        <div class="hb-flex hb-justify-content-center navigation-btn-container">
            <ul>
                <li class="active-room-page">1</li>
                <li>2</li>
            </ul>
        </div>
    </div>
</template>

<script>
import RoomComponent from "./room-components/room-component";

export default {
    name: "room-search",
    components: {RoomComponent},
    methods: {

    },
    mounted() {
    }
}
</script>

<style scoped>

</style>
