<template>
    <div class="about-body-container">
        <about-us-post/>
        <rooms-list/>
        <services-list/>
    </div>
</template>

<script>
import ServicesList from "./about-components/services-list";
import RoomsList from "./about-components/rooms-list";
import AboutUsPost from "./about-components/about-us-post";

export default {
    name: "about-body",
    components: {ServicesList, RoomsList, AboutUsPost},
}
</script>

<style scoped>

</style>
