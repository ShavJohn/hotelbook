<template>
    <div>
        <home-header/>
        <home-booking-component/>
    </div>
</template>

<script>
import HomeHeader from "../components/home/home-header";
import HomeBookingComponent from "../components/home/home-booking-component";
export default {
    name: "Home",
    components: {HomeBookingComponent, HomeHeader}
}
</script>

<style scoped>

</style>
