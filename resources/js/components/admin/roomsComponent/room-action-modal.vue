<template>
    <modals modal-id="roomAction">
        <template #modal-header>
            <h4>Add Room</h4>
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
                    <span class="input-name">Room Price</span>
                    <input type="number" id="room-price" name="room-price" placeholder="Enter Room Price" v-model="roomData[dataLang].price">
                </div>
                <div class="input-elements">
                    <span class="input-name">Room Image</span>
                    <label for="room-image">
                        <span class="image-action-btn">
                            <font-awesome-icon icon="fa-solid fa-file-arrow-up" />
                        </span>
                        <input type="file" class="hidden" id="room-image">
                    </label>
                </div>
                <div class="input-elements">
                    <span class="input-name">Room Additional Images</span>
                    <label for="room-additional-image">
                        <span class="image-action-btn">
                            <font-awesome-icon icon="fa-solid fa-file-arrow-up" />
                        </span>
                        <input type="file" class="hidden" id="room-additional-image">
                    </label>
                </div>
                <div class="input-elements">
                    <span class="input-name">Room Name</span>
                    <input type="text" id="room-name" name="room-name" placeholder="Enter Room Name" v-model="roomData[dataLang].name">
                </div>
                <div class="input-elements">
                    <span class="input-name">Room Type</span>
                    <select v-model="$store.state.rooms.room.selectedType">
                        <option value="" disabled selected>Select Room Type</option>
                        <option v-for="roomType in roomTypes" :value="roomType">{{ roomType[dataLang].name }}</option>
                    </select>
                </div>
                <div class="input-elements">
                    <span class="input-name">Room Features</span>
                    <multiselect-dropdown>
                        <template #button>
                            Room Features
                        </template>
                        <template #available-options>
                            <li v-for="roomFeature in filteredFeatures" @click="chooseFST('roomFeatures', roomFeature)">{{ roomFeature[dataLang].name }}</li>
                        </template>
                        <template #selected-options>
                            <template v-if="selectedFeatures.length">
                                <li v-for="(selectedFeature, key) in selectedFeatures">
                                    {{ selectedFeature[dataLang].name }}
                                    <font-awesome-icon icon="fa-solid fa-xmark" @click="removeItemFromArray('selectedFeatures', key)" />
                                </li>
                            </template>
                            <li v-else class="multiselect-disabled">Not selected yet</li>
                        </template>
                    </multiselect-dropdown>
                </div>
                <div class="input-elements">
                    <span class="input-name">Room Services</span>
                    <multiselect-dropdown>
                        <template #button>
                            Room Services
                        </template>
                        <template #available-options>
                            <li v-for="roomService in filteredServices" @click="chooseFST('roomServices', roomService)">{{ roomService[dataLang].name }}</li>
                        </template>
                        <template #selected-options>
                            <template v-if="selectedServices.length">
                                <li v-for="(selectedService, key) in selectedServices">
                                    {{ selectedService[dataLang].name }}
                                    <font-awesome-icon icon="fa-solid fa-xmark" @click="removeItemFromArray('selectedServices', key)" />
                                </li>
                            </template>
                            <li v-else class="multiselect-disabled">Not selected yet</li>
                        </template>
                    </multiselect-dropdown>
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
import DropDown from "../../mainComponents/drop-down";
import roomMixins from "../../../mixins/room-mixin";
import MultiselectDropdown from "../../mainComponents/multiselect-dropdown";
export default {
    name: "room-action-modal",
    components: {MultiselectDropdown, DropDown, Modals},
    mixins: [roomMixins],

}
</script>

<style scoped>

</style>
