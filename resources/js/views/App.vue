<template>
    <div>
        <div class="loader_bg" v-show="loader">
            <div class="loader"></div>
        </div>
        <vue-progress-bar></vue-progress-bar>
        <Admin v-if="authUser"></Admin>
        <alert-component/>
        <hb-header v-if="$route.name !== 'Login' && !$route.meta.admin"/>
        <div id="app-body" class="app-container">
            <router-view></router-view>
            <edit-elements-modal/>
        </div>
        <hb-footer v-if="$route.name !== 'Login' && !$route.meta.admin"/>
    </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import HbHeader from "../components/mainComponents/hb-header";
import HbFooter from "../components/mainComponents/hb-footer";
import Admin from "./Admin";
import AlertComponent from "../components/mainComponents/alert-component";
import EditElementsModal from "../components/mainComponents/edit-elements-modal";
export default {
    name: "App.vue",
    components: {AlertComponent, Admin, HbFooter, HbHeader, EditElementsModal},
    data() {
        return {
            loader: true
        }
    },
    setup() {
        const route = useRoute()
        const router = useRouter()
        return {
            router,
            route
        }
    },
    computed: {
        authUser() {
            return this.$store.getters['auth/authUserGetter']
        },
    },
    methods: {
        getGeneralData() {
            this.$store.dispatch('generalSettings/getGeneralSettings').then(() => {
                this.$store.dispatch('pageSettings/getPageSettings').then(() => {
                    this.$store.dispatch('postActions/getAllPosts').then(() => {
                        this.$store.dispatch('rooms/getRooms').then(() => {
                            this.loader = false
                        })
                    })
                })
            })
        },
        countVisitors(){

        }
    },
    async created() {
        this.$Progress.start()
        this.$router.beforeEach((to, from, next) => {
            //  does the page we want to go to have a meta.progress object
            if (to.meta.progress !== undefined) {
                let meta = to.meta.progress
                // parse meta tags
                this.$Progress.parseMeta(meta)
            }
            //  start the progress bar
            this.$Progress.start()
            //  continue to next page
            next()
        })
        //  hook the progress bar to finish after we've finished moving router-view
        this.$router.afterEach((to, from) => {
            //  finish the progress bar
            this.$Progress.finish()
        })

        await this.router.isReady();

        this.currentPage = this.route.name

    },
    mounted() {
        this.getGeneralData()
        this.countVisitors()
    }
}
</script>

<style scoped>

</style>
