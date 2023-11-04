<template>
    <div class="slider-container">
        <button @click="prevSlide()"><font-awesome-icon icon="fa-solid fa-chevron-left" /></button>
        <div class="slider-image-container">
            <img class="slider-image" v-for="(image, key) in images" :src="`${imagePrefix}/${image.image}`" :class="key === activeSlide && 'active-slider-image'">
        </div>
        <button @click="nextSlide()"><font-awesome-icon icon="fa-solid fa-chevron-right" /></button>
    </div>
</template>

<script>
export default {
    name: "slider",
    data() {
        return {
            activeSlide: 0
        }
    },
    props: {
        images: {
            type: Array,
            required: true,
        }
    },
    methods: {
        prevSlide() {
            this.activeSlide > 0 ? this.activeSlide-- : this.activeSlide =  this.images.length-1
        },
        nextSlide() {
            this.activeSlide < this.images.length-1 ? this.activeSlide++ : this.activeSlide = 0
        }
    }
}
</script>

<style scoped>

</style>
