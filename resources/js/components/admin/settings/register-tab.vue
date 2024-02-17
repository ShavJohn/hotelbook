<template>
    <form class="settings-content">
        <div class="settings-element">
            <label for="new-user-name">New User Name</label>
            <input id="new-user-name" type="text" placeholder="Enter New User Name"  v-model="newUser.name">
        </div>
        <div class="settings-element">
            <label for="new-user-email">New User Email</label>
            <input id="new-user-email" type="text" placeholder="Enter New User Email"  v-model="newUser.email">
        </div>
        <div class="settings-element">
            <label for="new-user-password">New User Password</label>
            <input id="new-user-password" type="text" placeholder="Enter New User Password"  v-model="newUser.password">
        </div>
        <div class="settings-element">
            <label for="new-user-password-confirm">New User Password Confirm</label>
            <input id="new-user-password-confirm" type="text" placeholder="Enter New User Password Confirm"  v-model="newUser.passwordConfirm">
        </div>
        <button @click.prevent="createUser()" class="hm-btn-style settings-button">Save Changes</button>
    </form>
</template>

<script>
export default {
    name: "register-tab",
    data() {
        return {
            newUser: {
                name: '',
                email: '',
                password: '',
                passwordConfirm: ''
            }
        }
    },
    methods: {
        createUser() {
            this.$store.dispatch('auth/createNewUser', this.newUser).then(res => {
                if(res.data.success) {
                    this.$store.dispatch('alert/alertResponse', {
                        'type': res?.data?.type,
                        'message': res?.data?.message
                    })
                    this.newUser.name = ''
                    this.newUser.email = ''
                    this.newUser.password = ''
                    this.newUser.passwordConfirm = ''
                } else {
                    this.$store.dispatch('alert/alertResponse', {
                        'type': res?.data?.type,
                        'message': res?.data?.message
                    })
                }
            }).catch(err => {
                this.$store.dispatch('alert/alertResponse', {
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
