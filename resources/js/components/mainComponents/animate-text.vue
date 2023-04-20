<template>
    <div>
        <h1 class="display-inline" id="textDisplay"></h1>
    </div>
</template>

<script>
export default {
    name: "animate-text",
    data () {
        return {
            iteration: 0,
            animationStarted: false
        };
    },
    props: {
        text: {
            type: String,
            required: true
        }
    },
    methods: {
         typeText() {
             this.animationStarted = true
            if (this.iteration < this.text.length) {
                document.getElementById("textDisplay").innerHTML += this.text.charAt(this.iteration);
                document.getElementById("textDisplay").style.animation = 'blink-caret .5s step-end infinite'
                this.iteration++;
                setTimeout(this.typeText, 200);
            } else {
                setTimeout(() => {
                    document.getElementById("textDisplay").style.removeProperty('animation')
                }, 1000)

            }
        },
        startAnimation() {
            let numberDisplay = document.getElementById('textDisplay')
            let scrollReach = window.innerHeight

            if(!this.animationStarted && numberDisplay.getBoundingClientRect().top <= scrollReach) {
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
        if(numberDisplay.getBoundingClientRect().top <= scrollReach) {
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
