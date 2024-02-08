<template>
    <div class="service-component">
        <div class="delimiter"></div>
        <h4>{{ roomOption[localeLang].name }}</h4>
        <p>{{ roomOption[localeLang].description }}</p>
    </div>
</template>

<script>
export default {
    name: "home-services-component",
    props: {
        roomOption: {
            required: true
        }
    }
}
</script>

<style scoped>

</style>
