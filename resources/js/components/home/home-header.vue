<template>
    <div class="responsive-background-image position-relative display-edit-elements" style="background-image: url(http://www.nicdarkthemes.com/themes/hotel-inn/wp/demo/inn-suites/wp-content/uploads/sites/2/2021/12/parallax-26.jpg)">
        <div class="background-image-filter">
            <animate-text class="header-text-styling" text="Reserve your Holiday" :display-time="200"/>
        </div>
        <div class="edit-elements">
            <font-awesome-icon @click="openModal('#edit-header-modal')" icon="fa-solid fa-pen-to-square" />
        </div>
        <edit-header-modal/>
    </div>
</template>

<script>
import AnimateText from "../mainComponents/animate-text";
import EditHeaderModal from "./edit-header-modal";
export default {
    name: "home-header",
    components: {EditHeaderModal, AnimateText},
    methods: {
        openModal(modalId) {
            $(modalId).modal("show");
        }
    }
}
</script>

<style scoped>

</style>
