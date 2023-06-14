<template>
    <div :id="modalId" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div id="modal-header" class="modal-header">
                    <h4>
                        <slot name="modal-header"></slot>
                    </h4>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div id="modal-body" class="modal-body">
                    <slot name="modal-body"></slot>
                </div>
                <div id="modal-footer" class="modal-footer">
                    <slot name="modal-footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "modals",
    props: {
        modalId: {
            required: true
        }
    }
}
</script>

<style scoped>

</style>
