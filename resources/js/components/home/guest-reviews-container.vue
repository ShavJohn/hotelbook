<template>
    <div>
        <guest-reviews-form/>
        <div v-if="reviews && reviews.length" class="guest-review-container">
            <carousel :breakpoints="breakpoints" :wrapAround="true" :transition="500">
                <slide v-for="review in reviews" :key="review.id">
                    <div  class="carousel__item">
                        <guest-reviews-element :first-name="review.fist_name"
                                               :last-name="review.last_name"
                                               :reviewValue="review.rating"
                                               :reviewText="review.review_text"/>
                    </div>
                </slide>

                <template #addons>
                    <navigation />
                    <pagination />
                </template>
            </carousel>
        </div>
    </div>
</template>

<script>
import GuestReviewsForm from "./guest-reviews-components/guest-reviews-form";
import GuestReviewsElement from "./guest-reviews-components/guest-reviews-element";
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
    name: "guest-reviews-container",
    components: {
        GuestReviewsElement,
        GuestReviewsForm,
        Carousel,
        Slide,
        Pagination,
        Navigation,
    },
    data() {
        return {
            reviewerName: {
                first_name: 'John',
                last_name: 'Doe'
            },
            reviewText: 'The sun dipped below the horizon, painting the sky in shades of orange and pink. A gentle breeze rustled through the trees, carrying with it the scent of freshly-cut grass. Birds chirped their ',
            breakpoints: {
                // 700px and up
                700: {
                    itemsToShow: 1.5,
                },
                800: {
                    itemsToShow: 2,
                },
                940: {
                    itemsToShow: 2.5,
                },
                900: {
                    itemsToShow: 3,
                },
                1100: {
                    itemsToShow: 4,
                },
                1580: {
                    itemsToShow: 4.5,
                },
                1700: {
                    itemsToShow: 5,
                }
            },
        }
    },
    computed: {
        reviews() {
            return this.$store.getters['review/getReviews']
        }
    }
}
</script>

<style scoped>

</style>
