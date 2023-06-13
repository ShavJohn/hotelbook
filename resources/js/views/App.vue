<template>
    <div>
        <div class="loader_bg" v-show="loader">
            <div class="loader"></div>
        </div>
        <Admin v-if="authUser"></Admin>
        <hb-header v-if="$route.name !== 'Login' && !$route.meta.admin"/>
        <div id="app-body" class="app-container">
            <router-view></router-view>
        </div>
        <hb-footer v-if="$route.name !== 'Login' && !$route.meta.admin"/>
    </div>
</template>

<script>
import HbHeader from "../components/mainComponents/hb-header";
import HbFooter from "../components/mainComponents/hb-footer";
import main from "../mixins/main"
import Admin from "./Admin";
export default {
    name: "App.vue",
    components: {Admin, HbFooter, HbHeader},
    mixins: [main],
    data() {
        return {
            loader: true
        }
    },
    computed: {
        authUser() {
            return this.$store.getters['auth/authUserGetter']
        },
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
