<template>
    <div class="responsive-background-image position-relative display-edit-elements" :style="headerData.header_background_image?.length && `background-image: url(${imagePrefix}/${headerData.header_background_image})`">
        <div class="background-image-filter">
            <animate-text class="header-text-styling" :text="headerData.header_title?.[localeLang] && headerData.header_title[localeLang]" :display-time="200"/>
        </div>
        <template v-if="authUser">
            <div class="edit-elements">
                <font-awesome-icon @click="openModal('#edit-header-modal')" icon="fa-solid fa-pen-to-square" />
            </div>
            <edit-header-modal/>
        </template>
    </div>
</template>

<script>
import AnimateText from "../mainComponents/animate-text";
import EditHeaderModal from "./edit-header-modal";
export default {
    name: "home-header",
    components: {EditHeaderModal, AnimateText},
}
</script>

<style scoped>

</style>
