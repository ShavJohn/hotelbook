<template>
    <div class="admin-header-container">
        <div>
            <font-awesome-icon icon="fa-solid fa-bars-staggered" />
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
export default {
    name: "admin-header",
    methods: {
        logout() {
            this.$store.dispatch('auth/logOut').then(res => {
                this.$emit('alert', {
                    'type': res.data.type,
                    'message': res.data.message
                })
            }).catch(err => {
                this.$emit('alert', {
                    'type': err?.data?.type,
                    'message': err?.data?.message
                })
            })
        }
    }
}
</script>

<style scoped>

</style>
