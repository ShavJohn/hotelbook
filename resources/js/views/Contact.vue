<template>
    <div>
        <contact-header/>
        <contact-body/>
    </div>
</template>

<script>
import ContactHeader from "../components/contact/contact-header";
import ContactBody from "../components/contact/contact-body"
export default {
    name: "Contact",
    components: {
        ContactBody, ContactHeader}
}
</script>

<style scoped>

</style>
