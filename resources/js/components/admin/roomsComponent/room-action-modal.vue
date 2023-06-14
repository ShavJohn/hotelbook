<template>
    <modals modal-id="roomAction">
        <template #modal-header>
            <h4>Add Room</h4>
            <div>
                <select class="modal-language-dropdown">
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
                    <input type="number" id="room-number" name="room-number" placeholder="Enter Room Number">
                </div>
                <div class="input-elements">
                    <span class="input-name">Room Price</span>
                    <input type="number" id="room-price" name="room-price" placeholder="Enter Room Price">
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
                    <input type="text" id="room-name" name="room-name" placeholder="Enter Room Name">
                </div>
                <div class="input-elements">
                    <span class="input-name">Room Type</span>
                </div>
                <div class="input-elements">
                    <span class="input-name">Room Features</span>
                </div>
                <div class="input-elements">
                    <span class="input-name">Room Services</span>
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
export default {
    name: "room-action-modal",
    components: {DropDown, Modals}
}
</script>

<style scoped>

</style>
