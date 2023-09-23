<template>
    <modals modal-id="addFeatures">
        <template #modal-header>
            <h4>Add Room Feature</h4>
            <div>
                <select class="modal-language-dropdown" v-model="dataLang">
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
                    <span class="input-name">Feature Name</span>
                    <input type="text" id="feature-name" name="feature-name" placeholder="Enter Room Feature" v-model="fSTItem[dataLang].name">
                </div>
                <div class="input-elements">
                    <span class="input-name">Feature Description</span>
                    <textarea id="feature-description" placeholder="Enter Room Feature Description" v-model="fSTItem[dataLang].description">
                    </textarea>
                </div>
                <template v-for="(feature, key) in roomFeatures">
                    <div class="position-relative margin-top-large">
                        <div class="element-remove-btn">
                            <font-awesome-icon icon="fa-solid fa-xmark" @click="removeItemFromArray('features', key)" />
                        </div>
                        <div class="input-elements">
                            <span class="input-name">Feature Name</span>
                            <input type="text" name="feature-name" placeholder="Enter Room Feature" v-model="feature[dataLang].name">
                        </div>
                        <div class="input-elements">
                            <span class="input-name">Feature Description</span>
                            <textarea placeholder="Enter Room Feature Description" v-model="feature[dataLang].description">
                        </textarea>
                        </div>
                    </div>
                </template>
            </form>
        </template>
        <template #modal-footer>
            <button type="button" data-bs-dismiss="modal" aria-label="Close" class="modal-btn btn-grey close">Close</button>
            <button class="modal-btn btn-action" @click="addItemToArray('features')">Add</button>
        </template>
    </modals>
</template>

<script>
import Modals from "../../mainComponents/modals";
import roomMixins from "../../../mixins/room-mixin"
export default {
    name: "add-features-modal",
    components: {Modals},
    mixins: [roomMixins],
}
</script>

<style scoped>

</style>
