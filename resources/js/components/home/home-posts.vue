<template>
    <div class="padding-90 padding-very-large-tablet position-relative">
        <button v-if="authUser" class="create-post-btn" @click="openModal('#post-actions-modal', 'add')">
            Create Post
        </button>
        <home-post/>
        <post-action-modal/>
    </div>
</template>

<script>

import HomePost from "./post-components/home-post";
import PostActionModal from "./post-components/post-action-modal";
import PostsMixins from "../../mixins/posts-mixins";

export default {
    name: "home-posts",
    components: {PostActionModal, HomePost},
    mixins: [PostsMixins]
}
</script>
