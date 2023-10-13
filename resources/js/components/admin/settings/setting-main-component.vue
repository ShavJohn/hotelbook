<template>
    <div class="settings-page-body">
        <div class="settings-container sm-full-screen-width md-screen-width-90 lg-screen-width-80">
            <div class="settings-menu">
                <ul>
                    <li @click="activeTab = 'general-tab'" :class="activeTab === 'general-tab' && 'active-tab-indicator'">General Settings</li>
                    <li @click="activeTab = 'profile-tab'" :class="activeTab === 'profile-tab' && 'active-tab-indicator'">Profile Settings</li>
                    <li @click="activeTab = 'register-tab'" :class="activeTab === 'register-tab' && 'active-tab-indicator'">Register Settings</li>
                </ul>
            </div>
            <div class="settings-body">
                <component :is="activeTab"/>
            </div>
        </div>
    </div>
</template>

<script>
import GeneralTab from "./general-tab";
import ProfileTab from "./profile-tab";
import RegisterTab from "./register-tab"
export default {
    name: "setting-main-component",
    components: {ProfileTab, GeneralTab, RegisterTab},
    data() {
        return {
            activeTab: 'general-tab'
        }
    }
}
</script>

<style scoped>

</style>
