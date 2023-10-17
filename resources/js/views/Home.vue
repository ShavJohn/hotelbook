<template>
    <div>
        <home-header/>
        <home-booking-component/>
        <home-posts/>
        <edit-elements-modal/>
    </div>
</template>

<script>
import HomeHeader from "../components/home/home-header";
import HomeBookingComponent from "../components/home/home-booking-component";
import HomePosts from "../components/home/home-posts";
import EditElementsModal from "../components/mainComponents/edit-elements-modal";
export default {
    name: "Home",
    components: {HomePosts, HomeBookingComponent, HomeHeader, EditElementsModal}
}
</script>

<style scoped>

</style>
