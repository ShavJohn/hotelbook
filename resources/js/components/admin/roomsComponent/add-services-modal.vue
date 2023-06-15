<template>
    <modals modal-id="addServices">
        <template #modal-header>
            <h4>Add Room Services</h4>
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
                    <span class="input-name">Service Name</span>
                    <input type="text" id="feature-name" name="feature-name" placeholder="Enter Room Feature" v-model="service[dataLang].name">
                </div>
                <div class="input-elements">
                    <span class="input-name">Feature Description</span>
                    <textarea id="feature-description" placeholder="Enter Room Feature Description" v-model="service[dataLang].description">
                    </textarea>
                </div>
                <template v-for="service in roomServices">
                    <div class="input-elements">
                        <span class="input-name">Service Name</span>
                        <input type="text" name="feature-name" placeholder="Enter Room Feature" v-model="service[dataLang].name">
                    </div>
                    <div class="input-elements">
                        <span class="input-name">Feature Description</span>
                        <textarea placeholder="Enter Room Feature Description" v-model="service[dataLang].description">
                    </textarea>
                    </div>
                </template>
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
    name: "add-services-modal",
    components: {Modals},
    computed: {
        roomServices() {
            return this.$store.getters['room/servicesGetter']
        },
    },
    data() {
        return {
            dataLang: 'en',
            service: {
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
