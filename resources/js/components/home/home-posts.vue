<template>
    <div class="position-relative">
        <button v-if="authUser" class="create-post-btn" @click="openModal('#post-actions-modal', 'add')">
            Create Post
        </button>
        <guest-reviews-container/>
        <home-post v-if="posts && posts.length" v-for="(post, key) in posts" :current-post-data="post" :post-key="key"/>
        <post-action-modal/>
    </div>
</template>

<script>

import HomePost from "./post-components/home-post";
import PostActionModal from "./post-components/post-action-modal";
import PostsMixins from "../../mixins/posts-mixins";
import GuestReviewsContainer from "./guest-reviews-container";

export default {
    name: "home-posts",
    components: {GuestReviewsContainer, PostActionModal, HomePost},
    mixins: [PostsMixins]
}
</script>
