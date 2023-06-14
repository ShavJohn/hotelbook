<template>
    <modals modal-id="roomAction">
        <template #modal-header>
            Add Room
        </template>
        <template #modal-body>
            <form class="modal-inputs-container">
                <div class="input-elements">
                    <span>Room Number</span>
                    <input type="number" id="room-number" name="room-number" placeholder="Enter Room Number">
                </div>
                <div class="input-elements">
                    <span>Room Image</span>
                    <label for="room-image">
                        <div class="image-action-btn">
                            <font-awesome-icon icon="fa-solid fa-file-arrow-up" />
                        </div>
                        <input type="file" class="hidden" id="room-image">
                    </label>
                </div>
                <div class="input-elements">
                    <span>Room Additional Images</span>
                    <label for="room-additional-image">
                        <div class="image-action-btn">
                            <font-awesome-icon icon="fa-solid fa-file-arrow-up" />
                        </div>
                        <input type="file" class="hidden" id="room-additional-image">
                    </label>
                </div>
                <div class="input-elements">
                    <span>Room Name</span>
                    <input type="text" id="room-name" name="room-name" placeholder="Enter Room Name">
                </div>
            </form>
        </template>
        <template #modal-footer>

        </template>
    </modals>
</template>

<script>
import Modals from "../../mainComponents/modals";
export default {
    name: "room-action-modal",
    components: {Modals}
}
</script>

<style scoped>

</style>
