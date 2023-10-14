<template>
    <div class="">
        <div class="bg-light-black padding-gigantic color-white hb-flex hb-justify-content-between hb-flex-wrap">
            <div class="hb-width-50 hb-width-100-tablet margin-bottom-large-tablet">
                <h2 class="margin-bottom font-500">About us</h2>
                <p class="font-16 font-500 hb-width-70 line-height-25">Sed sit amet nisl in velit viverra bibendum in ac nisi. Etiam efficitur dui vitae sem rutrum, id pretium nunc varius. Vestibulum hendrerit malesuada .</p>
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
        </div>
        <div class="bg-dark-black padding-medium hb-flex hb-justify-content-center">
            <span class="color-white font-16">&copy; {{ new Date().getFullYear() }} All rights belong to HotelBook.com</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "hb-footer",
    computed: {
        address() {
            return this.$store.getters['generalSettings/address']
        },
        phone() {
            return this.$store.getters['generalSettings/phone']
        },
        email() {
            return this.$store.getters['generalSettings/email']
        },
        businessHours() {
            return this.$store.getters['generalSettings/businessHours']
        },
    }
}
</script>

<style scoped>

</style>
