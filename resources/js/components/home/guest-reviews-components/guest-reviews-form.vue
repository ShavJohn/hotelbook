<template>
    <div class="guest-review-form-container">
        <div class="guest-review-form">
            <div class="guest-review-form-item">
                <label>Your Email you booked with</label>
                <input type="email" placeholder="Enter your email" v-model="review.email">
            </div>
            <div class="guest-review-form-item">
                <label>Your Phone number you booked with</label>
                <input type="number" placeholder="Enter your phone number" v-model="review.phone_number">
            </div>
            <div class="guest-review-form-item">
                <label>Your First Name</label>
                <input type="text" placeholder="Enter your name" v-model="review.fist_name">
            </div>
            <div class="guest-review-form-item">
                <label>Your Last Name</label>
                <input type="text" placeholder="Enter your name" v-model="review.last_name">
            </div>
            <div class="guest-review-form-item">
                <vue3-star-ratings v-model="review.rating"
                               starColor="#F5E81A"
                               controlBg="#d5d9e0"
                               inactiveColor="#888888"
                               :numberOfStars="5"
                               starSize="30"
                               controlColor="#d23c3c"
                               controlSize="60"
                               :disableClick="false" />
            </div>
            <div class="guest-review-form-item">
                <label>Enter Your Review</label>
                <textarea placeholder="Enter your Review" v-model="review.review_text"></textarea>
            </div>
            <div class="guest-review-form-item">
                <button @click="rateHotel">Send Review</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "guest-reviews-form",
    data() {
        return {
            value: 0,
        }
    },
    computed: {
        reviews() {
            return this.$store.getters['review/getReviews']
        },
        review: {
            get() {
               return this.$store.getters['review/getReview']
            },
            set(value) {
                console.log(value)
                this.$store.commit('review/setReview', value)
            }
        }
    },
    methods: {
        rateHotel() {
            this.$store.dispatch('review/rateHotel')
        }
    }
}
</script>

<style scoped>

</style>
