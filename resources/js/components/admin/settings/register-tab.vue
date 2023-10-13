<template>
    <form class="settings-content">
        <div class="settings-element">
            <label>New User Name</label>
            <input type="text" placeholder="Enter New User Name"  v-model="newUser.name">
        </div>
        <div class="settings-element">
            <label>New User Email</label>
            <input type="text" placeholder="Enter New User Email"  v-model="newUser.email">
        </div>
        <div class="settings-element">
            <label>New User Password</label>
            <input type="text" placeholder="Enter New User Password"  v-model="newUser.password">
        </div>
        <div class="settings-element">
            <label>New User Password Confirm</label>
            <input type="text" placeholder="Enter New User Password Confirm"  v-model="newUser.password">
        </div>
        <button @click.prevent="createUser()" class="hm-btn-style">Save Changes</button>
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
                    this.$emit('alert', {
                        'type': res.data.type,
                        'message': res.data.message
                    })
                } else {
                    this.$emit('alert', {
                        'type': res.data.type,
                        'message': res.data.message
                    })
                }
            }).catch(err => {
                this.$emit('alert', {
                    'type': err.data.type,
                    'message': err.data.message
                })
            })
        }
    }
}
</script>

<style scoped>

</style>
