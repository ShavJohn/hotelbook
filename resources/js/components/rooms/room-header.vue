<template>
    <div class="responsive-background-image position-relative display-edit-elements" :style="headerData.header_rooms_background_image?.length && `background-image: url(${imagePrefix}/${headerData.header_rooms_background_image})`">
        <div class="background-image-filter">
            <animate-text class="header-text-styling" :text="$t('rooms')" :display-time="500"/>
            <div class="booking-steps-indicator-container">
                <div v-for="(bookingIndicator, index) in bookingIndicators" class="booking-steps-indicator"
                     :class="bookingIndicator.routeName === $route.name && 'active-indicator'">
                    <div class="number-indicator"><span>{{ index+1 }}</span></div>
                    <span class="text-indicator">{{ $t(bookingIndicator.name) }}</span>
                </div>
            </div>
        </div>
        <template v-if="authUser">
            <div class="edit-elements header-edit-vertical-position">
                <font-awesome-icon @click="openElementEditModal('#edit-elements-modal', 'header_rooms_background_image')" icon="fa-solid fa-pen-to-square" />
            </div>
        </template>
    </div>
</template>

<script>
import AnimateText from "../mainComponents/animate-text";
import BookingMixins from "../../mixins/booking-mixins"
export default {
    name: "room-header",
    components: {AnimateText},
    mixins: [BookingMixins],
    data() {
        return {

        }
    }
}
</script>

<style scoped>

</style>
