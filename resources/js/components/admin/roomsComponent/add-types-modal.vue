<template>
    <modals modal-id="addTypes">
        <template #modal-header>
            <h4>Add Room Types</h4>
            <div>
                <select name="type-language-dropdown" id="type-language-dropdown" class="modal-language-dropdown" v-model="dataLang">
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
                    <span class="input-name">Type Name</span>
                    <input type="text" id="type-name" name="type-name" placeholder="Enter Room Type name" v-model="fSTItem[dataLang].name">
                </div>
                <div class="input-elements">
                    <span class="input-name">Type Count</span>
                    <input type="text" id="type-description" name="type-description" placeholder="Enter Room Type count" v-model="fSTItem.size">
                </div>
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
