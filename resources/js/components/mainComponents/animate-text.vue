<template>
    <span id="textDisplay">{{ displayText }}</span>
</template>

<script>
export default {
    name: "animate-text",
    data () {
        return {
            displayText: '',
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
            this.text.split('').forEach(letter => {
                console.log(letter)
                let interval = setTimeout(function () {
                    if(this.text.length <= this.displayText.length) {
                        clearTimeout(interval)
                    } else {
                        this.displayText += letter
                    }
                }.bind(this), 1000);
            })
        },
        startAnimation() {
            let numberDisplay = document.getElementById('textDisplay')
            let scrollReach = window.innerHeight

            if(numberDisplay.getBoundingClientRect().top <= scrollReach) {
                if(this.text.length > 0) {
                    this.typeText()
                }
                if(this.text.length === this.displayText.length) {
                    window.removeEventListener('scroll', this.startAnimation)
                }
            }
        }
    },
    mounted() {
        window.addEventListener('scroll',  this.startAnimation)

    }
}
</script>

<style scoped>

</style>
