<template>
    <div class="hb-flex hb-justify-content-between hb-align-items-center hb-flex-wrap">
        <template v-if="authUser">
            <div class="edit-about-us-page header-edit-vertical-position" @click="openEditAboutUs()">
                <font-awesome-icon icon="fa-solid fa-pen-to-square"/>
            </div>
        </template>
        <div class="about-us-post-image position-relative">
            <img v-if="aboutUsContent.image && aboutUsContent.image.length" :src="`${imagePrefix}/${aboutUsContent.image}`">
            <div v-if="aboutUsContent[localeLang].yearsOfExp" class="number-squer">
                <animate-number :number="setNumber(aboutUsContent[localeLang].yearsOfExp)" :animation-time="100"/>
                <span>{{ $t('years_of_experience') }}</span>
            </div>
        </div>
        <div class="about-us-post-text">
            <h2>{{ aboutUsContent[localeLang].title }}</h2>
            <p v-html="aboutUsContent[localeLang].content"></p>
            <hr>
            <strong class="margin-top">{{ $t('main_mail') }}</strong>
            <p class="margin-top">{{ email.value }}</p>
        </div>
        <about-us-post-edit-modal/>
    </div>
</template>

<script>
import AnimateNumber from "../../mainComponents/animate-number";
import AboutUsPostEditModal from "./about-us-post-edit-modal";
import aboutUsMixins from "../../../mixins/about-us-mixins";

export default {
    name: "about-us-post",
    components: {AboutUsPostEditModal, AnimateNumber},
    mixins: [aboutUsMixins],
    methods: {
        setNumber(number) {
            return number ? number : 0
        }
    }
}
</script>

<style scoped>

</style>
