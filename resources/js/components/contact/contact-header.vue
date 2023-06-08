<template>
    <div class="responsive-background-image position-relative" style="background-image: url(http://www.nicdarkthemes.com/themes/hotel-inn/wp/demo/inn-suites/wp-content/uploads/sites/2/2021/11/parallax-10.jpg)">
        <div class="background-image-filter">
            <animate-text class="header-text-styling" text="Contact" :display-time="500"/>
        </div>
    </div>
</template>

<script>
import AnimateText from "../mainComponents/animate-text";

export default {
    name: "contact-header",
    components: {AnimateText},
}
</script>

<style scoped>

</style>
