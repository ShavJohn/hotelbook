<template>
    <div class="responsive-background-image position-relative" :style="`background-image: url(${imagePrefix}/${roomData.main_image})`">
        <div class="background-image-filter">
            <div class="header-text-for-price">
                <span>{{roomData[localeLang]?.adult_price }} $</span>
                <span>/Per Night</span>
            </div>
        </div>
    </div>
</template>

<script>
import roomMixins from "../../mixins/room-mixin";

export default {
    name: "room-page-header",
    mixins: [roomMixins],
}
</script>

<style scoped>

</style>
