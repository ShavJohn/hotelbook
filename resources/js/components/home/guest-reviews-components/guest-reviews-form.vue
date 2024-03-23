<template>
    <div class="guest-review-form-container">
        <div class="guest-review-form">
            <div class="guest-review-form-item">
                <label>{{ $t('review.email_label') }}</label>
                <input type="email" :placeholder="$t('review.enter_email')" v-model="review.email">
            </div>
            <div class="guest-review-form-item">
                <label>{{ $t('review.phone_label') }}</label>
                <input type="number" :placeholder="$t('review.enter_phone')" v-model="review.phone_number">
            </div>
            <div class="guest-review-form-item">
                <label>{{ $t('review.first_name_label') }}</label>
                <input type="text" :placeholder="$t('review.enter_first_name')" v-model="review.fist_name">
            </div>
            <div class="guest-review-form-item">
                <label>{{ $t('review.last_name_label') }}</label>
                <input type="text" :placeholder="$t('review.enter_last_name')" v-model="review.last_name">
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
                <label>{{ $t('review.review_label') }}</label>
                <textarea :placeholder="$t('review.enter_review')" v-model="review.review_text"></textarea>
            </div>
            <div class="guest-review-form-item">
                <button @click="rateHotel">{{ $t('review.send_review') }}</button>
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
