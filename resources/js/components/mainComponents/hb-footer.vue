<template>
    <div class="">
        <div class="bg-light-black padding-gigantic color-white hb-flex hb-justify-content-between hb-flex-wrap display-edit-elements">
            <div class="hb-width-50 hb-width-100-tablet margin-bottom-large-tablet">
                <template v-if="footerData.footerText[localeLang].length">
                    <h2 class="margin-bottom font-500">About us</h2>
                    <p class="font-16 font-500 hb-width-70 line-height-25">{{ footerData.footerText[localeLang] }}</p>
                </template>
            </div>
            <div class="hb-width-50 hb-width-100-tablet">
                <h2 class="margin-bottom font-500">All Contacts</h2>
                <ul class="strip-list-style">
                    <li><font-awesome-icon icon="fa-solid fa-location-dot" class="margin-right" />{{ address.value }}</li>
                    <li><font-awesome-icon icon="fa-solid fa-phone" class="margin-right"/>{{ phone.value }}</li>
                    <li><font-awesome-icon icon="fa-solid fa-envelope" class="margin-right"/>{{ email.value }}</li>
                    <li><font-awesome-icon icon="fa-regular fa-clock" class="margin-right"/>{{ businessHours.value }}</li>
                </ul>
            </div>
            <template v-if="authUser">
                <div class="edit-elements element-edit-vertical-position">
                    <font-awesome-icon @click="openElementEditModal('#edit-elements-modal', 'footer-section')" icon="fa-solid fa-pen-to-square" />
                </div>
            </template>
        </div>
        <div class="bg-dark-black padding-medium hb-flex hb-justify-content-center">
            <span class="color-white font-16">&copy; {{ new Date().getFullYear() }} All rights belong to HotelBook.com</span>
        </div>
    </div>
</template>

<script>
import EditFooterModal from "./edit-elements-modal";

export default {
    name: "hb-footer",
    components: {EditFooterModal},
}
</script>

<style scoped>

</style>
