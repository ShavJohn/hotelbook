<template>
    <div class="responsive-background-image position-relative display-edit-elements" :style="(headerData.header_home_background_image && headerData.header_home_background_image?.length) && `background-image: url(${imagePrefix}/${headerData.header_home_background_image})`">
        <div class="background-image-filter">
            <animate-text v-if="headerData.header_title && headerData.header_title[localeLang]" class="header-text-styling" :text="headerData.header_title?.[localeLang] && headerData.header_title[localeLang]" :display-time="200"/>
        </div>
        <template v-if="authUser">
            <div class="edit-elements header-edit-vertical-position">
                <font-awesome-icon @click="openElementEditModal('#edit-elements-modal', 'header_home_background_image')" icon="fa-solid fa-pen-to-square" />
            </div>
        </template>
        <div v-if="averageRating > 1" class="hotel-average-rating">
            <vue3-star-ratings v-model="averageRating"
                               starColor="#F5E81A"
                               controlBg="#d5d9e0"
                               inactiveColor="#888888"
                               :numberOfStars="5"
                               starSize="30"
                               controlColor="#d23c3c"
                               controlSize="60"
                               :disableClick="true" />
        </div>
    </div>
</template>

<script>
import AnimateText from "../mainComponents/animate-text";
export default {
    name: "home-header",
    components: {AnimateText},
    computed: {
        averageRating() {
            return this.$store.getters['review/getAverageRating']
        }
    }
}
</script>

<style scoped>

</style>
