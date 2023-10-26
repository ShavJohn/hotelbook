<template>
    <div class="position-relative post-direction-design padding-very-large hb-flex hb-justify-content-between hb-align-items-center hb-flex-wrap post-actions-container">
        <div class="post-actions-btn">
            <font-awesome-icon @click="openModal('#post-actions-modal', 'edit', currentPostData)" icon="fa-solid fa-pen-to-square" />
            <font-awesome-icon @click="deletePost(currentPostData.id, postKey)" icon="fa-solid fa-trash" />
        </div>
        <div class="about-us-post-image position-relative">
            <img v-if="currentPostData.image_path && currentPostData.image_path.length" :src="`${imagePrefix}/${currentPostData.image_path}`">
        </div>
        <div class="about-us-post-text">
            <h2>{{ currentPostData.title[localeLang] }}</h2>
            <p>{{ currentPostData.body[localeLang] }}</p>
        </div>
    </div>
</template>

<script>
import PostsMixins from "../../../mixins/posts-mixins";

export default {
    name: "home-post",
    props: {
        currentPostData: {
            required: true
        },
        postKey: {
            required: true
        }
    },
    mixins: [PostsMixins]
}
</script>

<style scoped>

</style>
