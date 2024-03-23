<template>
    <div class="guest-review">
        <div class="guest-review-item">
            <vue3-star-ratings :modelValue="reviewValue"
                               starColor="#F5E81A"
                               controlBg="#d5d9e0"
                               inactiveColor="#888888"
                               :numberOfStars="5"
                               starSize="25"
                               controlColor="#d23c3c"
                               controlSize="60"
                               :disableClick="true" />
        </div>
        <div class="guest-review-item">
            <p>{{ reviewText }}</p>
        </div>
        <div class="guest-review-item">
            <font-awesome-icon icon="fa-solid fa-circle-user" />
            <span>{{ firstName }} {{ lastName }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "guest-reviews-element",
    props: {
        firstName: {
            required: true,
        },
        lastName: {
            required: true,
        },
        reviewValue: {
            required: true
        },
        reviewText: {
            required: true
        }
    }
}
</script>

<style scoped>

</style>
