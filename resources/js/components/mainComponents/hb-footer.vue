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
                    <li><font-awesome-icon icon="fa-solid fa-location-dot" class="margin-right" />111 8th Ave, New York U.S.A.</li>
                    <li><font-awesome-icon icon="fa-solid fa-phone" class="margin-right"/>Reserve +1-202-555-0153</li>
                    <li><font-awesome-icon icon="fa-solid fa-envelope" class="margin-right"/>info@hotel.com</li>
                    <li><font-awesome-icon icon="fa-regular fa-clock" class="margin-right"/>08 am - 06 pm Sunday closed</li>
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
    name: "hb-footer"
}
</script>

<style scoped>

</style>
