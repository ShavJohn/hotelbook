<template>
    <div :id="modalId" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div id="modal-header" class="modal-header">
                    <slot name="modal-header"></slot>
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
