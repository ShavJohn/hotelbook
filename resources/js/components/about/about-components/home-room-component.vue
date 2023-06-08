<template>
    <div class="home-room-component-styling">
        <img src="http://www.nicdarkthemes.com/themes/hotel-inn/wp/demo/inn-suites/wp-content/uploads/sites/2/2021/12/parallax-26.jpg">
        <div class="room-price">
            <span>From {{ price }}$</span>
        </div>
        <div class="room-info">
            <h3>{{ roomName }}</h3>
            <div>
                <font-awesome-icon icon="fa-solid fa-user" />
                <span>{{ guestCount }}</span>
            </div>
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
        guestCount: {
            required: true
        }
    }
}
</script>

<style scoped>

</style>
