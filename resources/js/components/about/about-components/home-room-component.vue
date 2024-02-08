<template>
    <div class="home-room-component-styling">
        <img :src="`${imagePrefix}/${backgroundImage}`">
        <div class="room-price">
            <span>From {{ price }}$</span>
        </div>
        <div class="room-info">
            <h3>{{ roomName }}</h3>
        </div>
    </div>
</template>

<script>
export default {
    name: "home-room-component",
    props: {
        price: {
            required: true
        },
        roomName: {
            required: true
        },
        backgroundImage: {
            required: true
        }
    }
}
</script>

<style scoped>

</style>
