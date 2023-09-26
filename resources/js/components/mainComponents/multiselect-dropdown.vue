<template>
    <div class="multiselect-dropdown-container" v-outside="() => closeDrop()">
        <button @click.prevent="open = !open">
            <slot name="button"></slot>
            <font-awesome-icon icon="fa-solid fa-chevron-down" />
        </button>
        <ul :class="open && 'open'">
            <slot name="available-options"></slot>
            <hr>
            <slot name="selected-options"></slot>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "multiselect-dropdown",
        data() {
            return {
                open: false
            }
        },
        methods: {
            closeDrop() {
                if(this.open) {
                    this.open = false
                }
            }
        }
    }
</script>

<style scoped>

</style>
