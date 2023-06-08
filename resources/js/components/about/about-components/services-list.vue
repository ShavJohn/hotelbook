<template>
    <div class="margin-top-gigantic">
        <div class="hb-flex justify-content-center">
            <h1 class="service-title">All Services</h1>
        </div>
        <div class="hb-flex  hb-justify-content-between margin-top-gigantic hb-flex-wrap">
            <home-services-component/>
            <home-services-component/>
            <home-services-component/>
        </div>
    </div>
</template>

<script>
import HomeServicesComponent from "./home-services-component";
export default {
    name: "services-list",
    components: {HomeServicesComponent}
}
</script>

<style scoped>

</style>
