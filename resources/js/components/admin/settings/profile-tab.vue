<template>
    <form class="settings-content">
        <div class="settings-element">
            <label>User Name</label>
            <input type="text" placeholder="Enter Your User Name"  v-model="currentUser.name">
        </div>
        <div class="settings-element">
            <label>Your Email Address</label>
            <input type="email" placeholder="Enter Your Email" v-model="currentUser.email">
        </div>
        <div class="settings-element">
            <label>Your New Email</label>
            <input type="email" placeholder="Enter Your New Email" v-model="currentUser.newEmail">
        </div>
        <div class="settings-element">
            <label>Current Password</label>
            <input type="password" autocomplete="off" placeholder="Enter Your Current Password" v-model="currentUser.password">
        </div>
        <div class="settings-element">
            <label>New Password</label>
            <input type="password" autocomplete="off" placeholder="Enter Your New Password" v-model="currentUser.newPassword">
        </div>
        <div class="settings-element">
            <label>New Password Confirm</label>
            <input type="password" autocomplete="off" placeholder="Enter Your Confirm Password" v-model="currentUser.newPasswordConfirm">
        </div>
        <button @click.prevent="saveChanges()" class="hm-btn-style">Save Changes</button>
    </form>
</template>

<script>
export default {
    name: "profile-tab",
    data() {
        return {
            currentTub: 'currentUser',
            currentUser: {
                id: '',
                name: '',
                email: '',
                newEmail: '',
                notification_switch: '',
                password: '',
                newPassword: '',
                newPasswordConfirm: '',
            },
        }
    },
    computed: {
        authUser() {
            return this.$store.getters['auth/authUserGetter']
        },
    },
    methods: {
        getAuthUser() {
            this.$store.dispatch('auth/getAuthUser').then(res => {
                if(res.data.success) {
                    this.currentUser.name  = res.data.authUser.name
                    this.currentUser.email = res.data.authUser.email
                    this.currentUser.id = res.data.authUser.id
                    this.currentUser.notification_switch = res.data.authUser.notification_switch ? true : false
                }
            })
        },
        saveChanges() {

            if(this.currentUser.newEmail.length) {
                this.currentUser.email = this.currentUser.newEmail
            }
            this.$store.dispatch('auth/saveUserChanges', this.currentUser).then(res => {
                this.$emit('alert', {
                    'type': res.data.type,
                    'message': res.data.message
                })
            }).catch(err => {
                this.$emit('alert', {
                    'type': err.data.type,
                    'message': err.data.message
                })
            })
        }
    },
    mounted() {
        this.getAuthUser()
    }
}
</script>

<style scoped>

</style>
