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

        </template>
        <template #modal-footer>

        </template>
    </modals>
</template>

<script>
import Modals from "../mainComponents/modals";
export default {
    name: "edit-header-modal",
    components: {Modals},
    data() {
        return {
            dataLang: 'en',
        }
    }
}
</script>

<style scoped>

</style>
