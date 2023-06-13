<template>
    <div class="admin-container">
        <admin-header></admin-header>
        <admin-sidebar></admin-sidebar>
    </div>
</template>

<script>
import AdminHeader from "../components/admin/admin-header"
import AdminSidebar from "../components/admin/admin-sidebar";

export default {
    name: "Admin",
    components: {AdminSidebar, AdminHeader},
}
</script>

<style scoped>

</style>
