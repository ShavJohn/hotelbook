<template>
    <div class="admin-header-container">
        <div class="admin-sidebar-btn">
            <font-awesome-icon @click="toggleSidebar()" icon="fa-solid fa-bars-staggered" />
        </div>
        <div class="admin-buttons-container">
            <div class="notification-btn-container" @click="$router.push({name: 'Messages'})">
                <template v-if="unreadEmails > 0">
                    <font-awesome-icon icon="fa-solid fa-envelope" />
                    <span class="notifications-count">
                        {{ unreadEmails }}
                    </span>
                </template>
                <font-awesome-icon v-else icon="fa-regular fa-envelope" />
            </div>
            <div class="notification-btn-container" @click="$router.push({name: 'Bookings'})">
                <template v-if="pendingBookings > 0">
                    <font-awesome-icon icon="fa-solid fa-calendar-days" />
                    <span class="notifications-count">{{ pendingBookings }}</span>
                </template>
                <font-awesome-icon v-else icon="fa-regular fa-calendar-days" />
            </div>
            <button @click="logout()" class="logout-btn">
                <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
                Logout
            </button>
        </div>
    </div>
</template>

<script>
import AdminPanelMixins from '../../mixins/admin-panel-mixins'
import adminBookingMixins from "../../mixins/admin-booking-mixins";
import emails from "../../mixins/emails-mixins";
export default {
    name: "admin-header",
    mixins: [AdminPanelMixins, adminBookingMixins, emails],
    computed: {
        pendingBookings() {
            return this.$store.getters['bookings/getPendingBookings']
        },
        unreadEmails() {
            return this.$store.getters['emails/getUnreadEmails']
        }
    },
    mounted() {
        this.getEmails(this.skip, this.take)
        this.getBookingsList()
    },
    methods: {
        logout() {
            this.$store.dispatch('auth/logOut').then(res => {
                if(res.data.success){
                    this.$router.push({name: 'Home'})
                }
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
    }
}
</script>

<style scoped>

</style>
