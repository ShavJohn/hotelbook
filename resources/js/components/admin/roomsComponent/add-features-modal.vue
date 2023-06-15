<template>
    <modals modal-id="addFeatures">
        <template #modal-header>
            <h4>Add Feature</h4>
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
                    <span class="input-name">Room Number</span>
                    <input type="number" id="room-number" name="room-number" placeholder="Enter Room Number" v-model="roomData.number">
                </div>
                <div class="input-elements">
                    <span class="input-name">Room Number</span>
                    <input type="number" id="room-number" name="room-number" placeholder="Enter Room Number" v-model="roomData.number">
                </div>
            </form>
        </template>
        <template #modal-footer>
            <button type="button" data-bs-dismiss="modal" aria-label="Close" class="modal-btn btn-grey close">Close</button>
            <button class="modal-btn btn-action">Add</button>
        </template>
    </modals>
</template>

<script>
import Modals from "../../mainComponents/modals";
export default {
    name: "add-features-modal",
    components: {Modals},
    data() {
        return {
            dataLang: 'en',
            feature: {
                id: '',
                slugName: '',
                en: {
                    name: '',
                    description: ''
                },
                ru: {
                    name: '',
                    description: ''
                }
            },
        }
    }
}
</script>

<style scoped>

</style>
