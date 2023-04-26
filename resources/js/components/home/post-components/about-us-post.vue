<template>
    <div class="hb-flex hb-justify-content-between hb-align-items-center hb-flex-wrap">
        <div class="about-us-post-image position-relative">
            <img src="http://www.nicdarkthemes.com/themes/hotel-inn/wp/demo/inn-suites/wp-content/uploads/sites/2/2021/12/image-1.jpg">
            <div class="number-squer">
                <animate-number :number="24" :animation-time="100"/>
                <span>Years of Experience</span>
            </div>
        </div>
        <div class="about-us-post-text">
            <h2>Welcome to Spa Relax Hotel</h2>
            <p>Quisque vitae posuere libero. Phasellus feugiat erat sit amet dui condimentum imperdiet. Ut at libero nec ligula fringilla dictum sit amet id dui. Integer gravida dolor elit, sit amet vestibulum mi elementum eget. Nullam in nibh vitae magna tempus tincidunt ac sed ligula. Sed ornare eu dui a lobortis in hac habitasse.</p>
            <hr>
            <strong class="margin-top">Main Mail</strong>
            <p class="margin-top">info@hotel.com</p>
        </div>
    </div>
</template>

<script>
import AnimateNumber from "../../mainComponents/animate-number";
export default {
    name: "about-us-post",
    components: {AnimateNumber}
}
</script>

<style scoped>

</style>
