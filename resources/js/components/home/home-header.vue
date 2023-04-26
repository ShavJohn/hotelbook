<template>
    <div class="responsive-background-image position-relative" style="background-image: url(http://www.nicdarkthemes.com/themes/hotel-inn/wp/demo/inn-suites/wp-content/uploads/sites/2/2021/12/parallax-26.jpg)">
        <div class="background-image-filter">
            <animate-text class="header-text-styling" text="Reserve your Holiday" :display-time="200"/>
        </div>
    </div>
</template>

<script>
import AnimateText from "../mainComponents/animate-text";
export default {
    name: "home-header",
    components: {AnimateText}
}
</script>

<style scoped>

</style>
