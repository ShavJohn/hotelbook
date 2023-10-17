<template>
    <modals modal-id="edit-elements-modal">
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
                <template v-if="elementEditModalType === 'header-section'">
                    <div class="input-elements">
                        <span class="input-name">Header Title</span>
                        <input type="text" id="header-title" name="header-title" placeholder="Enter Header Title" v-model="headerData.header_title[dataLang]">
                    </div>
                    <div class="input-elements">
                        <span class="input-name">Background Image</span>
                        <label v-if="!headerData.header_home_background_image?.length">
                        <span class="image-action-btn">
                            <font-awesome-icon icon="fa-solid fa-file-arrow-up" />
                        </span>
                            <input type="file" class="hidden" name="image" @change="uploadImage($event)">
                        </label>
                        <div v-else class="image-content">
                            <img v-if="headerData.header_home_background_image && headerData.header_home_background_image?.length" :src="`${imagePrefix}/${headerData.header_home_background_image}`">
                            <div class="image-action-btn">
                                <font-awesome-icon icon="fa-solid fa-xmark" @click="deleteImage(headerData.header_home_background_image)" />
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else-if="elementEditModalType === 'footer-section'">
                    <div class="input-elements">
                        <span class="input-name">Footer text</span>
                        <textarea type="text" id="footer-text" name="footer-text" placeholder="Enter Footer Text" v-model="footerData.footerText[dataLang]"></textarea>
                    </div>
                </template>
            </form>
        </template>
        <template #modal-footer>
            <button type="button" data-bs-dismiss="modal" aria-label="Close" class="modal-btn btn-grey close">Close</button>
            <button v-if="elementEditModalType === 'header-section'" class="modal-btn btn-action" @click="updateSetting('#edit-elements-modal', headerData)">Update</button>
            <button v-if="elementEditModalType === 'footer-section'" class="modal-btn btn-action" @click="updateSetting('#edit-elements-modal', footerData)">Update</button>
        </template>
    </modals>
</template>

<script>
import Modals from "./modals";
export default {
    name: "edit-header-modal",
    components: {Modals},
}
</script>

<style scoped>

</style>
