<template>
    <modals modal-id="addTypes">
        <template #modal-header>
            <h4>Add Room Types</h4>
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
                    <span class="input-name">Type</span>
                    <input type="text" id="feature-name" name="feature-name" placeholder="Enter Room Feature" v-model="fSTItem[dataLang].name">
                </div>
                <template v-for="(type, key) in roomTypes">
                    <div class="position-relative">
                        <div class="element-remove-btn">
                            <font-awesome-icon icon="fa-solid fa-xmark" @click="removeItemFromArray('types', key)" />
                        </div>
                        <div class="input-elements">
                            <span class="input-name">Type</span>
                            <input type="text" name="feature-name" placeholder="Enter Room Feature" v-model="type[dataLang].name">
                        </div>
                    </div>
                </template>
            </form>
        </template>
        <template #modal-footer>
            <button type="button" data-bs-dismiss="modal" aria-label="Close" class="modal-btn btn-grey close">Close</button>
            <button class="modal-btn btn-action" @click="addItemToArray('types')">Add</button>
        </template>
    </modals>
</template>

<script>
import Modals from "../../mainComponents/modals";
import roomMixins from "../../../mixins/room-mixin";

export default {
    name: "add-types-modal",
    components: {Modals},
    mixins: [roomMixins],
}
</script>

<style scoped>

</style>
