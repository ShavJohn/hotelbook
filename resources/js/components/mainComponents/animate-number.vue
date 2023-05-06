<template>
    <span id="numberDisplay">{{displayNumber}}</span>
</template>

<script>

export default {
    data () {
        return {
            displayNumber: 0,
            counter: false,
            animationStarted: false
        };
    },
    props: {
        number: {
            type: Number,
            default: 0,
            required: true
        },
        animationTime: {
            type: Number,
            default: 100,
            required: true
        }
    },
    methods: {
        counterNumber() {
            this.animationStarted = true
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
            }.bind(this), this.animationTime);
        },
        startAnimation() {
            let numberDisplay = document.getElementById('numberDisplay')
            let scrollReach = window.innerHeight

            if(!this.animationStarted && numberDisplay && numberDisplay.getBoundingClientRect().top <= scrollReach) {
                if(this.number > 0) {
                    this.counterNumber()
                }
                if(this.animationStarted) {
                    window.removeEventListener('scroll', this.startAnimation)
                }
            }
        }
    },
    mounted() {
        let numberDisplay = document.getElementById('numberDisplay')
        let scrollReach = window.innerHeight

        if(numberDisplay && numberDisplay.getBoundingClientRect().top <= scrollReach) {
            if (this.number > 0) {
                this.counterNumber()
            }
        }
        if(!this.animationStarted) {
            window.addEventListener('scroll',  this.startAnimation)
        }
    }
};
</script>
