<template>
    <modals modal-id="edit-header-modal">
        <template #modal-header>
            <h4>Edit Header</h4>
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
            <form class="modal-inputs-container overflow-modal">
                <div class="input-elements">
                    <span class="input-name">Header Title</span>
                    <input type="text" id="header-title" name="header-title" placeholder="Enter Header Title" v-model="headerData.header_title[dataLang]">
                </div>
                <div class="input-elements">
                    <span class="input-name">Background Image</span>
                    <label v-if="!headerData.header_background_image?.length">
                        <span class="image-action-btn">
                            <font-awesome-icon icon="fa-solid fa-file-arrow-up" />
                        </span>
                        <input type="file" class="hidden" name="image" @change="uploadImage($event)">
                    </label>
                    <div v-else class="image-content">
                        <img v-if="headerData.header_background_image && headerData.header_background_image?.length" :src="`${imagePrefix}/${headerData.header_background_image}`">
                        <div class="image-action-btn">
                            <font-awesome-icon icon="fa-solid fa-xmark" @click="deleteImage(headerData.header_background_image)" />
                        </div>
                    </div>
                </div>
            </form>
        </template>
        <template #modal-footer>
            <button type="button" data-bs-dismiss="modal" aria-label="Close" class="modal-btn btn-grey close">Close</button>
            <button class="modal-btn btn-action" @click="updateSetting('#edit-header-modal',this.headerData)">Update</button>
        </template>
    </modals>
</template>

<script>
import Modals from "../mainComponents/modals";
export default {
    name: "edit-header-modal",
    components: {Modals},
}
</script>

<style scoped>

</style>
