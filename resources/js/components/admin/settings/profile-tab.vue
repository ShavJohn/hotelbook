<template>
    <form class="settings-content">
        <div class="settings-element">
            <label for="user-name">User Name</label>
            <input id="user-name" type="text" placeholder="Enter Your User Name"  v-model="currentUser.name">
        </div>
        <div class="settings-element">
            <label for="user-email">Your Email Address</label>
            <input id="user-email" type="email" placeholder="Enter Your Email" v-model="currentUser.email">
        </div>
        <div class="settings-element">
            <label for="user-new-email">Your New Email</label>
            <input id="user-new-email" type="email" placeholder="Enter Your New Email" v-model="currentUser.newEmail">
        </div>
        <div class="settings-element">
            <label for="current-password">Current Password</label>
            <input id="current-password" type="password" autocomplete="off" placeholder="Enter Your Current Password" v-model="currentUser.password">
        </div>
        <div class="settings-element">
            <label for="new-password">New Password</label>
            <input id="new-password" type="password" autocomplete="off" placeholder="Enter Your New Password" v-model="currentUser.newPassword">
        </div>
        <div class="settings-element">
            <label for="new-password-confirm">New Password Confirm</label>
            <input id="new-password-confirm" type="password" autocomplete="off" placeholder="Enter Your Confirm Password" v-model="currentUser.newPasswordConfirm">
        </div>
        <button @click.prevent="saveChanges()" class="hm-btn-style settings-button">Save Changes</button>
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
                this.$store.dispatch('alert/alertResponse', {
                    'type': res?.data?.type,
                    'message': res?.data?.message
                })
            }).catch(err => {
                this.$store.dispatch('alert/alertResponse', {
                    'type': err?.data?.type,
                    'message': err?.data?.message
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
