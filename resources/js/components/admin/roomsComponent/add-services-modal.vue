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
            <form class="modal-inputs-container overflow-modal">
                <div class="input-elements">
                    <span class="input-name">Service Name</span>
                    <input type="text" id="service-name" name="service-name" placeholder="Enter Room service" v-model="fSTItem[dataLang].name">
                </div>
                <div class="input-elements">
                    <span class="input-name">Feature Description</span>
                    <textarea id="service-description" placeholder="Enter Room service Description" v-model="fSTItem[dataLang].description">
                    </textarea>
                </div>
                <template v-for="(service, key) in roomServices">
                    <div class="position-relative margin-top-large">
                        <div class="element-remove-btn">
                            <font-awesome-icon icon="fa-solid fa-xmark" @click="removeItemFromArray('services', service.id, key)" />
                        </div>
                        <div class="input-elements-display">
                            <div>
                                <span class="input-name">Service Name</span>
                            </div>
                            <div>
                                <span>{{ service[dataLang].name }}</span>
                            </div>
                        </div>
                        <div class="input-elements-display">
                            <div>
                                <span class="input-name">Feature Description</span>
                            </div>
                            <div>
                                <span>{{ service[dataLang].description }}</span>
                            </div>
                        </div>
                    </div>
                </template>
            </form>
        </template>
        <template #modal-footer>
            <button type="button" data-bs-dismiss="modal" aria-label="Close" class="modal-btn btn-grey close">Close</button>
            <button class="modal-btn btn-action" @click="addItemToArray('services')">Add</button>
        </template>
    </modals>
</template>

<script>
import Modals from "../../mainComponents/modals";
import roomMixins from "../../../mixins/room-mixin";

export default {
    name: "add-services-modal",
    components: {Modals},
    mixins: [roomMixins],
}
</script>

<style scoped>

</style>
