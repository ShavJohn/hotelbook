<template>
    <div>
        <h1 class="display-inline" id="textDisplay">{{ displayText }}</h1>
    </div>
</template>

<script>
export default {
    name: "animate-text",
    data () {
        return {
            iteration: 0,
            animationStarted: false,
            displayText: '',
            iterableText: ''
        };
    },
    props: {
        text: {
            type: String,
            required: true
        },
        displayTime: {
            type: Number,
            required: true,
            default: 200
        },
    },
    watch: {
        iterableText(val) {
            if(val !== this.text) {
                this.typeText()
            }
        },
        text(val) {
            if(!val.length) {
                this.iteration = 0
                this.animationStarted = true
                this.displayText = ''
                this.iterableText = ''
            }
            this.typeText()
        },
        localeLang(val) {
            this.iteration = 0
            this.animationStarted = true
            this.displayText = ''
            this.iterableText = ''

            this.typeText()
        }
    },
    methods: {
         typeText() {
             this.animationStarted = true
            if (this.iteration < this.text.length) {
                this.iterableText = this.text
                this.displayText += this.text.charAt(this.iteration);
                document.getElementById("textDisplay") ? document.getElementById("textDisplay").style.animation = 'blink-caret .5s step-end infinite' : ''
                this.iteration++;
                setTimeout(this.typeText, this.displayTime);
            } else {
                setTimeout(() => {
                    document.getElementById("textDisplay") ? document.getElementById("textDisplay").style.removeProperty('animation') : ''
                }, 1000)

            }
        },
        startAnimation() {
            let textDisplay = document.getElementById('textDisplay')
            let scrollReach = window.innerHeight

            if(!this.animationStarted && textDisplay && textDisplay.getBoundingClientRect().top <= scrollReach) {
                this.typeText()
            }
            if(this.animationStarted) {
                window.removeEventListener('scroll', this.startAnimation)
            }

        }

    },
    mounted() {
        let numberDisplay = document.getElementById('textDisplay')
        let scrollReach = window.innerHeight
        if(numberDisplay && numberDisplay.getBoundingClientRect().top <= scrollReach) {
            this.typeText()
        }
        if(!this.animationStarted) {
            window.addEventListener('scroll',  this.startAnimation)
        }
    }
}
</script>

<style scoped>

</style>
