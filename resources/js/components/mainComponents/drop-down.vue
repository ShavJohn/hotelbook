<template>
    <div class="dropdown-container">
        <button @click.prevent="open = !open" class="dropdown-button cursor-pointer">
            <slot name="button"></slot>
        </button>
        <ul @click.prevent="open = !open" class="dropdown-menu" :class="open && 'open'">
            <slot name="dropdown-menu"></slot>
        </ul>
    </div>
</template>

<script>
export default {
    name: "drop-down",
    data() {
        return {
            open: false
        }
    },
}
</script>

<style scoped>

</style>
