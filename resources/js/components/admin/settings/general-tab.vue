<template>
    <form class="settings-content">
        <div class="general-settings-language-options-container">
            <select name="general-settings-language" id="general-settings-language" class="general-settings-language-options" v-model="dataLang">
                <option value="en">EN</option>
                <option value="ru">RU</option>
            </select>
        </div>
        <div class="settings-element">
            <label for="web-name">Web Site Name</label>
            <input id="web-name" name="web-name" type="text" placeholder="Enter Name" v-model="companyName.value">
        </div>
        <div class="settings-element">
            <label for="web-logo">Web Site Logo</label>
            <label v-if="!logo.value.length">
                        <span class="image-action-btn">
                            <font-awesome-icon icon="fa-solid fa-file-arrow-up" />
                        </span>
                <input id="web-logo" type="file" class="hidden" name="image" @change="uploadLogo($event, 0, 'single')">
            </label>
            <div v-else class="image-content">
                <img v-if="logo.value && logo.value.length" :src="`${imagePrefix}/${logo.value}`">
                <div class="image-action-btn">
                    <font-awesome-icon icon="fa-solid fa-xmark" @click="deleteLogo(logo.value, 0, 'single')"/>
                </div>
            </div>
        </div>
        <div class="settings-element">
            <label for="hotel-address">Hotel Address</label>
            <input id="hotel-address" type="text" placeholder="Enter Hotel Address" v-model="address.value">
        </div>
        <div class="settings-element">
            <label for="hotel-phone">Hotel Phone</label>
            <input id="hotel-phone" type="tel" placeholder="Enter Hotel Phone" v-model="phone.value">
        </div>
        <div class="settings-element">
            <label for="web-email">Web Site E-mail</label>
            <input id="web-email" type="text" placeholder="Enter Web Site E-mail" v-model="email.value">
        </div>
        <div class="settings-element">
            <label for="business-hour">Business Hours</label>
            <input id="business-hour" type="text" placeholder="Enter Business Hours" v-model="businessHours.value">
        </div>
        <div class="settings-element">
            <label for="meta-title">Meta Title for Google's search engine</label>
            <input id="meta-title" type="text" placeholder="Enter Meta Title for Google's search engine" v-model="metaTitle.value">
        </div>
        <div class="settings-element">
            <label for="meta-desc">Meta Description for Google search engine</label>
            <textarea id="meta-desc" type="text" placeholder="Enter Meta Description for Google search engine" v-model="metaDesc.value"></textarea>
        </div>
        <div class="settings-element">
            <label>Terms And Conditions text</label>
            <div class="settings-element-edit-container">
                <div class="terms-and-conditions-switch-container" @click="termsAndConditions.json_value.termsAdnConditionsSwitch = !termsAndConditions.json_value.termsAdnConditionsSwitch">
                    <font-awesome-icon v-if="termsAndConditions.json_value.termsAdnConditionsSwitch" icon="fa-solid fa-toggle-on" />
                    <font-awesome-icon v-else icon="fa-solid fa-toggle-off" />
                </div>
                <div class="settings-quill-container">
                    <QuillEditor :options="optionsTermsAndConditions" contentType="html" v-model:content="termsAndConditions.json_value[dataLang]"/>
                </div>
            </div>
        </div>
        <div class="settings-element">
            <label>Booking Confirm Email text</label>
            <div class="settings-quill-container">
                <QuillEditor :options="optionsBookingConfirmEmail" contentType="html" v-model:content="bookingConfirmEmail.json_value[dataLang]"/>
            </div>
        </div>
        <button @click.prevent="updateGeneralSettings()" class="settings-button">Update Settings</button>
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
