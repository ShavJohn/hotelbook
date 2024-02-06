<template>
    <modals modal-id="removeBookingModal">
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
            <button class="room-table-action-btn btn-bg-red" @click="removeBooking(removeBookingId)">Remove</button>
        </template>
    </modals>
</template>

<script>
import Modals from "../../mainComponents/modals";
import adminBookingMixins from "../../../mixins/admin-booking-mixins";

export default {
    name: "remove-booking-modal",
    components: {Modals},
    mixins: [adminBookingMixins],
    props: {
        removeBookingId: {
            required: true
        }
    }
}
</script>

<style scoped>

</style>
