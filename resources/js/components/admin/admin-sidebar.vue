<template>
    <div class="admin-sidebar-container" :class="openAdminSidebar ? 'admin-sidebar-menu-open' : 'admin-sidebar-menu-close'">
        <template v-if="openAdminSidebar">
            <div class="hb-flex hb-justify-content-start padding">
                <font-awesome-icon @click="toggleSidebar()" class="color-white font-20 cursor-pointer" icon="fa-solid fa-xmark" />
            </div>
            <ul class="admin-sidebar-menu-container">
                <li>
                    <button @click="$router.push({name: 'Home'})">
                        <font-awesome-icon icon="fa-solid fa-house" />
                        Home
                    </button>
                </li>
                <li>
                    <button @click="$router.push({name: 'Bookings'})">
                        <font-awesome-icon icon="fa-solid fa-calendar-days" />
                        Bookings
                    </button>
                </li>
                <li>
                    <button @click="$router.push({name: 'Statistics'})">
                        <font-awesome-icon icon="fa-solid fa-chart-line" />
                        Statistics
                    </button>
                </li>
                <li>
                    <button @click="$router.push({name: 'Messages'})">
                        <font-awesome-icon icon="fa-solid fa-envelope" />
                        Messages
                    </button>
                </li>
                <li>
                    <button @click="$router.push({name: 'AdminRooms'})">
                        <font-awesome-icon icon="fa-solid fa-bed" />
                        Rooms
                    </button>
                </li>
                <li>
                    <button>
                        <font-awesome-icon icon="fa-solid fa-gear" />
                        Settings
                    </button>
                </li>
            </ul>
        </template>
    </div>
</template>

<script>
import AdminPanelMixins from '../../mixins/admin-panel-mixins'
export default {
    name: "admin-sidebar",
    mixins: [AdminPanelMixins],
}
</script>

<style scoped>

</style>
