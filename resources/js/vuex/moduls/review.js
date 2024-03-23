export default {
    namespaced: true,
    state: {
        reviews: [],
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
        }
    },
    mutations: {
        setReviews(state, data) {
            state.reviews = data
        },
        setReview(state, data) {
            state.review = data
        }
    },
    actions: {
        async getReviews(context) {
            try {
                const res = await axios.get('/get-reviews');
                context.commit('setReviews', res.data.reviews)
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
