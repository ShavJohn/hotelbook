<template>
    <span id="numberDisplay">{{displayNumber}}</span>
</template>

<script>

export default {
    data () {
        return {
            displayNumber: 0,
            counter: false
        };
    },
    props: {
        number: {
            type: Number,
            default: 0
        }
    },
    watch: {
        number (val) {

        },
    },
    methods: {
        counterNumber() {
            clearInterval(this.counter);
            if (this.number === this.displayNumber) {
                return;
            }
            this.counter = setInterval(function () {
                if (Math.floor(this.displayNumber) !== Math.floor(this.number)) {
                    this.displayNumber++
                } else {
                    this.displayNumber = this.number;
                    clearInterval(this.counter);
                }
            }.bind(this), 10);
        },
        startAnimation() {
            let numberDisplay = document.getElementById('numberDisplay')
            let scrollReach = window.innerHeight

            if(numberDisplay.getBoundingClientRect().top <= scrollReach) {
                if(this.number > 0) {
                    this.counterNumber()
                }
                removeEventListener('scroll', this.startAnimation)
            }
        }
    },
    mounted() {
        window.addEventListener('scroll',  () => {
            this.startAnimation()
        })

    }
};
</script>
