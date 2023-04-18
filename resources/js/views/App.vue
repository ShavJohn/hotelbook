<template>
    <div>
        <hb-header/>
        <div class="app-container">
            <router-view></router-view>
        </div>
        <hb-footer/>
    </div>
</template>

<script>
import HbHeader from "../components/mainComponents/hb-header";
import HbFooter from "../components/mainComponents/hb-footer";
export default {
    name: "App.vue",
    components: {HbFooter, HbHeader}
}
</script>

<style scoped>

</style>
