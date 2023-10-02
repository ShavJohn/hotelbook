<template>
    <modals modal-id="removeRoom">
        <template #modal-header>
            <h4>Remove Room</h4>
            <div>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </template>
        <template #modal-body>
            <form class="modal-inputs-container">
                <span class="remove-room-message">Are you sure want to remove the room</span>
            </form>
        </template>
        <template #modal-footer>
            <button type="button" data-bs-dismiss="modal" aria-label="Close" class="modal-btn btn-grey close">Close</button>
            <button class="room-table-action-btn btn-bg-red" @click="removeRoom(removeRoomNum)">Remove
                <div v-if="btnLoading" class="spinner-border loader-style" role="status">
                    <span class="sr-only"></span>
                </div>
            </button>
        </template>
    </modals>
</template>

<script>
import Modals from "../../mainComponents/modals";
import roomMixins from "../../../mixins/room-mixin"
export default {
    name: "remove-room-modal",
    mixins: [roomMixins],
    components: {Modals},
    props: {
        removeRoomNum: {
            required: true
        }
    }
}
</script>

<style scoped>

</style>
