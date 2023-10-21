<template>
    <div class="responsive-background-image position-relative display-edit-elements" :style="headerData.header_home_background_image?.length && `background-image: url(${imagePrefix}/${headerData.header_home_background_image})`">
        <div class="background-image-filter">
            <animate-text class="header-text-styling" :text="headerData.header_title?.[localeLang] && headerData.header_title[localeLang]" :display-time="200"/>
        </div>
        <template v-if="authUser">
            <div class="edit-elements header-edit-vertical-position">
                <font-awesome-icon @click="openElementEditModal('#edit-elements-modal', 'header_home_background_image')" icon="fa-solid fa-pen-to-square" />
            </div>
        </template>
    </div>
</template>

<script>
import AnimateText from "../mainComponents/animate-text";
export default {
    name: "home-header",
    components: {AnimateText},
}
</script>

<style scoped>

</style>
