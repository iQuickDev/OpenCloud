<template>
    <transition :appear="true" @enter="enter" @before-enter="beforeEnter">
        <div>
            <div id="wrapper">
                <div id="alerticon">
                    <h1 id="icon">!</h1>
                </div>
                <h2>Could not log you in</h2>
            </div>
        </div>
    </transition>
</template>
<script>
import gsap from 'gsap'
export default {
    name: 'LoginError',
    methods: {
        beforeEnter(el) {
            el.style.opacity = 0
            el.style.transform = 'translateY(250px)'
        },
        enter(el, done) {
            gsap.to(el, {
                duration: 1,
                opacity: 1,
                scale: 1,
                yPercent: -500,
                ease: 'elastic.out(1, 0.8)',
                onComplete: done
            })
        }
    }
}
</script>
<style lang="sass" scoped>

h2
    padding-left: 10px
    padding-right: 10px

#icon
    text-align: center
    position: relative
    top: -5px
    font-size: 2.2rem

h2, h1
    margin: 0
    display: inline-block
    vertical-align: middle

#wrapper
    width: 300px
    border: 1px solid #fff
    border-radius: 50px 15px 15px 50px
    text-align: center
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )
    backdrop-filter: blur( 4px )
    -webkit-backdrop-filter: blur( 4px )
    border: 1px solid rgba( 255, 255, 255, 0.18 )

#alerticon
    position: relative
    left: -8px
    width: 60px
    height: 60px
    background: rgba( 255, 0, 0, 0.4 )
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )
    backdrop-filter: blur( 4px )
    -webkit-backdrop-filter: blur( 4px )
    border-radius: 50%
    border: 1px solid rgba( 255, 255, 255, 0.18 )
    display: inline-block
</style>
