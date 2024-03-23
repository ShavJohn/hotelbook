export default {
    namespaced: true,
    state: {
        reviews: [],
        averageRating: 0,
        review: {
            email: '',
            phone_number: '',
            fist_name: '',
            last_name: '',
            rating: '',
            review_text: ''
        }
    },
    getters: {
        getReviews(state) {
            return state.reviews
        },
        getReview(state) {
            return state.review
        },
        getAverageRating(state) {
            return state.averageRating
        }
    },
    mutations: {
        setReviews(state, data) {
            state.reviews = data
        },
        setReview(state, data) {
            state.review.email = data.email ? data.email : '';
            state.review.phone_number = data.phone_number ? data.phone_number : '';
            state.review.fist_name = data.fist_name ? data.fist_name : '';
            state.review.last_name = data.last_name ? data.last_name : '';
            state.review.rating = data.rating ? data.rating : '';
            state.review.review_text = data.review_text ? data.review_text : '';
        },
        resetData(state) {
            state.review.email = '';
            state.review.phone_number = '';
            state.review.fist_name = '';
            state.review.last_name = '';
            state.review.rating = '';
            state.review.review_text = '';
        },
        setAverageRating(state, data) {
            state.averageRating = data
        }
    },
    actions: {
        async getReviews(context) {
            try {
                const res = await axios.get('/get-reviews');
                context.commit('setReviews', res.data.reviews)
                context.commit('setAverageRating', res.data.average_rating)
                return res;
            } catch (err) {
                await context.dispatch('alert/alertResponse', {
                    'type': 'error',
                    'status': 0,
                    'message': 'Something went wrong'
                }, { root: true });
                throw err;
            }
        },
        async rateHotel(context) {
            try {
                let data = context.state.review
                const res = await axios.post('/rate-hotel', data);
                await context.dispatch('getReviews')
                if(res.data.success) {
                    context.commit('resetData')
                }
                await context.dispatch('alert/alertResponse', {
                    'type': res.data && res.data.type ? res.data.type : '',
                    'status': res.status,
                    'message': res.data && res.data.message ? res.data.message : ''
                }, { root: true });
                return res;
            } catch (err) {
                await context.dispatch('alert/alertResponse', {
                    'type': 'error',
                    'status': 0,
                    'message': 'Something went wrong'
                }, { root: true });
                throw err;
            }
        }
    }
}
