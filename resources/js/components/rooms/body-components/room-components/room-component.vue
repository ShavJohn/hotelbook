<template>
    <div class="booking-room-container">
        <div class="room-image">
            <img src="http://www.nicdarkthemes.com/themes/hotel-inn/wp/demo/inn-suites/wp-content/uploads/sites/2/2021/12/parallax-26.jpg"/>
            <div class="room-status">
                <span>Available</span>
            </div>
        </div>
        <div class="room-info-card">
            <div class="room-info-container">
                <h2>{{ roomName }}</h2>
                <div class="room-guest-count">
                    <font-awesome-icon icon="fa-solid fa-user" />
                    <span>{{ guestCount }}</span>
                </div>
                <p>Some text for room that goes here for testing</p>
                <button>
                    <span>Book Now For {{ price }} $</span>
                </button>
            </div>
            <div class="room-features">
                <div class="room-feature-delimiter"></div>
                <div class="feature-icons">

                </div>
                <button><router-link :to="{ name: 'Room', params: { room: 'single-suit'}}">Full Info </router-link></button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "room-component",
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
