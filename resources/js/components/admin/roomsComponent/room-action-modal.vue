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
                    <span class="input-name">Adult Price</span>
                    <input type="number" id="adult-price" name="adult-price" placeholder="Enter Adult Price" v-model="roomData[dataLang].adult_price">
                </div>
                <div class="input-elements">
                    <span class="input-name">Child Price</span>
                    <input type="number" id="child-price" name="child-price" placeholder="Enter Child Price" v-model="roomData[dataLang].child_price">
                </div>
                <div class="input-elements">
                    <span class="input-name">Room Image</span>
                    <label v-if="!roomData.main_image.length" :key="imagesUploaded">
                        <span class="image-action-btn">
                            <font-awesome-icon icon="fa-solid fa-file-arrow-up" />
                        </span>
                        <input type="file" class="hidden" name="image" @change="uploadImage($event, key)">
                    </label>
                    <div v-else class="image-content">
                        <img v-if="roomData.main_image && roomData.main_image.length" :src="`${imagePrefix}/${roomData.main_image}`">
                        <div class="image-action-btn">
                            <font-awesome-icon icon="fa-solid fa-xmark" @click="deleteImage(roomData.main_image, 0, 'single')" />
                        </div>
                    </div>
                </div>
                <div class="input-elements">
                    <span class="input-name">Room Additional Images</span>
                    <div class="multiple-images-container">
                        <label v-if="roomData.additionalImages.length < 10" :key="imagesUploaded" for="room-additional-image">
                            <span class="image-action-btn">
                                <font-awesome-icon icon="fa-solid fa-file-arrow-up" />
                            </span>
                            <input type="file" class="hidden" id="room-additional-image" @change="uploadImages">
                        </label>
                        <div v-if="roomData.additionalImages && roomData.additionalImages.length" v-for="(image, key) in roomData.additionalImages"
                             class="image-content margin-top-medium">
                            <img v-if="image && image.length" :src="`${imagePrefix}/${image}`">
                            <div class="image-action-btn">
                                <font-awesome-icon v-if="typeof image === 'string'" icon="fa-solid fa-xmark" @click="deleteImage(image, key, true)" />
                                <font-awesome-icon v-else icon="fa-solid fa-xmark" @click="deleteImageFromDBToo(image, key, true)" />
                            </div>
                        </div>
                    </div>
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
            <button class="modal-btn btn-action" @click.prevent="addRoom">Add</button>
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
