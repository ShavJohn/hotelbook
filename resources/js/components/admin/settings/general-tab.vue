<template>
    <form class="settings-content">
        <div class="settings-element">
            <label>Web Site Name</label>
            <input type="text" placeholder="Enter Name" v-model="companyName.value">
        </div>
        <div class="settings-element">
            <label>Web Site Logo</label>
            <label v-if="!logo.value.length">
                        <span class="image-action-btn">
                            <font-awesome-icon icon="fa-solid fa-file-arrow-up" />
                        </span>
                <input type="file" class="hidden" name="image" @change="uploadLogo($event, 0, 'single')">
            </label>
            <div v-else class="image-content">
                <img v-if="logo.value && logo.value.length" :src="`${imagePrefix}/${logo.value}`">
                <div class="image-action-btn">
                    <font-awesome-icon icon="fa-solid fa-xmark" @click="deleteLogo(logo.value, 0, 'single')"/>
                </div>
            </div>
        </div>
        <div class="settings-element">
            <label>Hotel Address</label>
            <input type="text" placeholder="Enter Hotel Address" v-model="address.value">
        </div>
        <div class="settings-element">
            <label>Hotel Phone</label>
            <input type="tel" placeholder="Enter Hotel Phone" v-model="phone.value">
        </div>
        <div class="settings-element">
            <label>Web Site E-mail</label>
            <input type="text" placeholder="Enter Web Site E-mail" v-model="email.value">
        </div>
        <div class="settings-element">
            <label>Business Hours</label>
            <input type="text" placeholder="Enter Business Hours" v-model="businessHours.value">
        </div>
        <div class="settings-element">
            <label>Meta Title for Google's search engine</label>
            <input type="text" placeholder="Enter Meta Title for Google's search engine" v-model="metaTitle.value">
        </div>
        <div class="settings-element">
            <label>Meta Description for Google search engine</label>
            <textarea type="text" placeholder="Enter Meta Description for Google search engine" v-model="metaDesc.value"></textarea>
        </div>
        <button @click.prevent="updateGeneralSettings()">Update Settings</button>
    </form>
</template>

<script>
import generalSettingsActions from '../../../mixins/generalSettingsActions'

export default {
    name: "general-tab",
    mixins: [generalSettingsActions],

}
</script>

<style scoped>

</style>
