<template>
    <modals modal-id="about-us-modal">
        <template #modal-header>
            <h4>About Us</h4>
            <div>
                <select name="room-action-language-dropdown" id="room-action-language-dropdown" class="modal-language-dropdown" v-model="dataLang">
                    <option value="en">EN</option>
                    <option value="ru">RU</option>
                </select>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </template>
        <template #modal-body>
            <form class="modal-inputs-container decreasing-modal-height">
                <div class="input-elements">
                    <span class="input-name">Title</span>
                    <input type="text" id="Title" name="title"
                           placeholder="Enter Title" v-model="aboutUsContent[dataLang].title">
                </div>
                <div class="input-elements">
                    <span class="input-name">Content</span>
                    <input type="text" id="content" name="content"
                           placeholder="Enter Content" v-model="aboutUsContent[dataLang].content">
                </div>
                <div class="input-elements">
                    <span class="input-name">Years of Experience</span>
                    <input type="number" id="years-of-exp" name="years-of-exp"
                           placeholder="Enter Your Experience" v-model="aboutUsContent[dataLang].yearsOfExp">
                </div>
                <div class="input-elements">
                    <span class="input-name">Room Image</span>
                    <label v-if="!aboutUsContent.image.length" :key="imagesUploaded">
                        <span class="image-action-btn">
                            <font-awesome-icon icon="fa-solid fa-file-arrow-up" />
                        </span>
                        <input type="file" class="hidden" name="image" @change="uploadAboutUsImage($event)">
                    </label>
                    <div v-else class="image-content">
                        <img v-if="aboutUsContent.image && aboutUsContent.image.length" :src="`${imagePrefix}/${aboutUsContent.image}`">
                        <div class="image-action-btn">
                            <font-awesome-icon icon="fa-solid fa-xmark" @click="deleteAboutUsImage(aboutUsContent.image, 0, 'single')" />
                        </div>
                    </div>
                </div>
            </form>
        </template>
        <template #modal-footer>
            <button type="button" data-bs-dismiss="modal" aria-label="Close" class="modal-btn btn-grey close">Close</button>
            <button type="button" class="modal-btn btn-action" @click="updateAboutUsPage(aboutUsContent)">Update</button>
        </template>
    </modals>
</template>

<script>
import Modals from "../../mainComponents/modals";
import aboutUsMixins from "../../../mixins/about-us-mixins";
export default {
    name: "about-us-post-edit-modal",
    components: {Modals},
    mixins: [aboutUsMixins],
}
</script>

<style scoped>

</style>
