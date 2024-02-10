<template>
    <div class="margin-top-gigantic">
        <div class="hb-flex justify-content-center">
            <h1 class="service-title">{{ $t('all_services') }}</h1>
        </div>
        <div class="hb-flex  hb-justify-content-between margin-top-gigantic hb-flex-wrap">
            <home-services-component v-for="service in services" :room-option="service"/>
            <home-services-component v-for="feature in features" :room-option="feature"/>
        </div>
    </div>
</template>

<script>
import HomeServicesComponent from "./home-services-component";
import aboutUsMixins from "../../../mixins/about-us-mixins";
export default {
    name: "services-list",
    components: {HomeServicesComponent},
    mixins: [aboutUsMixins],}
</script>

<style scoped>

</style>
