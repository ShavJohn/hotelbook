<template>
    <modals modal-id="roomBookingAction">
        <template #modal-header>
            <h4>Room Booking Actions</h4>
            <div>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </template>
        <template #modal-body>
            <pre>{{ bookingData }}</pre>
        </template>
        <template #modal-footer>
            <button type="button" data-bs-dismiss="modal" aria-label="Close" class="modal-btn btn-grey close">Close</button>

        </template>
    </modals>
</template>

<script>
import Modals from "../../mainComponents/modals";

export default {
    name: "room-booking-action-modal",
    components: {Modals},
    props: {
        bookingData: {
            required: true
        }
    }
}
</script>

<style scoped>

</style>
