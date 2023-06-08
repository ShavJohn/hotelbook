<template>
    <div>
        <div class="loader_bg" v-show="loader">
            <div class="loader"></div>
        </div>
        <hb-header v-if="$route.name !== 'Login'"/>
        <div class="app-container">
            <router-view></router-view>
        </div>
        <hb-footer v-if="$route.name !== 'Login'"/>
    </div>
</template>

<script>
import HbHeader from "../components/mainComponents/hb-header";
import HbFooter from "../components/mainComponents/hb-footer";
import main from "../mixins/main"
export default {
    name: "App.vue",
    components: {HbFooter, HbHeader},
    mixins: [main],
    data() {
        return {
            loader: true
        }
    },
    methods: {
        getGeneralData() {
            setTimeout(() => {
                this.loader = false
            }, 1000)

        }
    },
    mounted() {
        this.getGeneralData()
    }
}
</script>

<style scoped>

</style>
