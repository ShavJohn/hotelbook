<template>
    <div class="admin-header-container">
        <div class="admin-sidebar-btn">
            <font-awesome-icon @click="toggleSidebar()" icon="fa-solid fa-bars-staggered" />
        </div>
        <div>

            <button @click="logout()" class="logout-btn">
                <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
                Logout
            </button>
        </div>
    </div>
</template>

<script>
import AdminPanelMixins from '../../mixins/admin-panel-mixins'
export default {
    name: "admin-header",
    mixins: [AdminPanelMixins],
    methods: {
        logout() {
            this.$store.dispatch('auth/logOut').then(res => {
                if(res.data.success){
                    this.$router.push({name: 'Home'})
                }
                this.$store.dispatch('alert/alertResponse', {
                    'type': err?.data?.type,
                    'message': err?.data?.message
                })
            }).catch(err => {
                this.$store.dispatch('alert/alertResponse', {
                    'type': res?.data?.type,
                    'message': res?.data?.message
                })
            })
        }
    }
}
</script>

<style scoped>

</style>
