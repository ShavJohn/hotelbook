<template>
    <div class="alert-component" :class="[alertMessage.type, alertOpen ? 'open-alert' : 'close-alert']">
        <span>{{ alertMessage.message }}</span>
    </div>
</template>

<script>
export default {
    name: "alert-component",
    data() {
        return {
            type: '',
            open: false,
            message: '',
        }
    },
    computed: {
        alertMessage() {
            return this.$store.getters['alert/alertGetter']
        },
        alertOpen() {
            return this.$store.getters['alert/alertOpenGetter']
        }
    },
}
</script>
