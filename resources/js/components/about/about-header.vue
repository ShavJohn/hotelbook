<template>
    <div class="responsive-background-image position-relative display-edit-elements" :style="headerData.header_about_background_image?.length && `background-image: url(${imagePrefix}/${headerData.header_about_background_image})`">
        <div class="background-image-filter">
            <animate-text class="header-text-styling" :text="$t('about')" :display-time="500"/>
        </div>
        <template v-if="authUser">
            <div class="edit-elements header-edit-vertical-position">
                <font-awesome-icon @click="openElementEditModal('#edit-elements-modal', 'header_about_background_image')" icon="fa-solid fa-pen-to-square" />
            </div>
        </template>
    </div>
</template>

<script>
import AnimateText from "../mainComponents/animate-text";

export default {
    name: "about-header",
    components: {AnimateText},
}
</script>

<style scoped>

</style>
