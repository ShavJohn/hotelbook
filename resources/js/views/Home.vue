<template>
    <div>
        <home-header/>
        <home-booking-component/>
        <home-posts/>
    </div>
</template>

<script>
import HomeHeader from "../components/home/home-header";
import HomeBookingComponent from "../components/home/home-booking-component";
import HomePosts from "../components/home/home-posts";

export default {
    name: "Home",
    components: {HomePosts, HomeBookingComponent, HomeHeader},
}
</script>

<style scoped>

</style>
