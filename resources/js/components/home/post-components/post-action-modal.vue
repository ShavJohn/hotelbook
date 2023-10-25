<template>
    <modals modal-id="post-actions-modal">
        <template #modal-header>
            {{ postsModalType }}
            <h4 v-if="postsModalType === 'add'">Add Post</h4>
            <h4 v-else-if="postsModalType === 'edit'">Edit Post</h4>
            <div>
                <select name="room-features-language-dropdown" id="room-features-language-dropdown" class="modal-language-dropdown" v-model="dataLang">
                    <option value="en">EN</option>
                    <option value="ru">RU</option>
                </select>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </template>
        <template #modal-body>
            <form class="modal-inputs-container">
                <div class="input-elements">
                    <span class="input-name">Room Image</span>
                    <label v-if="!postData.image_path.length" :key="imagesUploaded">
                        <span class="image-action-btn">
                            <font-awesome-icon icon="fa-solid fa-file-arrow-up" />
                        </span>
                        <input type="file" class="hidden" name="image" @change="uploadPostImage($event)">
                    </label>
                    <div v-else class="image-content">
                        <img v-if="postData.image_path && postData.image_path.length" :src="`${imagePrefix}/${postData.image_path}`">
                        <div class="image-action-btn">
                            <font-awesome-icon icon="fa-solid fa-xmark" @click="deletePostImage(postData.image_path, 0, 'single')" />
                        </div>
                    </div>
                </div>
                <div class="input-elements">
                    <span class="input-name">Post Title</span>
                    <input type="text" id="post-title" name="post-title" placeholder="Enter Post Title" v-model="postData.title[dataLang]">
                </div>
                <div class="input-elements">
                    <span class="input-name">Post Text</span>
                    <textarea id="post-text" name="post-text" placeholder="Enter Post text" v-model="postData.body[dataLang]"></textarea>
                </div>
            </form>
        </template>
        <template #modal-footer>
            <button type="button" data-bs-dismiss="modal" aria-label="Close" class="modal-btn btn-grey close">Close</button>
            <button v-if="postsModalType === 'add'" class="modal-btn btn-action" @click="createPost()">Create Post</button>
            <button v-else-if="postsModalType === 'edit'" class="modal-btn btn-action">Edit Post</button>
        </template>
    </modals>
</template>

<script>
import Modals from "../../mainComponents/modals";
import PostsMixins from "../../../mixins/posts-mixins";
export default {
    name: "post-action-modal",
    components: {Modals},
    mixins: [PostsMixins]
}
</script>

<style scoped>

</style>
