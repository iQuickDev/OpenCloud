<template>
    <div id="wrapper">
        <ul>
            <li v-for="(element, i) in images" :key="i">
                <img :src="element.img" @click="element.method" />
            </li>
        </ul>
        <div id="disk-container">
            <h3>Disk<br />{{ percentage + '%' }}</h3>
            <circle-progress
                id="disk-bar"
                class="diskbar"
                fill-color="#42B883"
                :size="50"
                :border-bg-width="5"
                :border-width="5"
                :percent="percentage"
            />
        </div>
    </div>
</template>

<script>
import dashboard from '../assets/dashboard.png'
import upload from '../assets/upload.png'
import shell from '../assets/shell.png'
import logout from '../assets/logout.png'
import Endpoints from '../services/Endpoints'
import 'vue3-circle-progress/dist/circle-progress.css'
import CircleProgress from 'vue3-circle-progress'

export default {
    name: 'NavBar',
    data() {
        return {
            images: [
                {
                    img: dashboard,
                    alt: 'dashboard',
                    method: this.toDashboard
                },
                {
                    img: upload,
                    alt: 'upload',
                    method: this.upload
                },
                {
                    img: shell,
                    alt: 'shell',
                    method: this.openShell
                },
                {
                    img: logout,
                    alt: 'logout',
                    method: this.logout
                }
            ],
            percentage: 0
        }
    },
    components: {
        CircleProgress
    },
    methods: {
        toDashboard() {
            this.$router.push({ name: 'Dashboard' })
        },
        openShell() {
            this.$router.push({ name: 'Shell' })
        },
        async upload() {
            let uploader = document.createElement('input')
            uploader.setAttribute('type', 'file')
            uploader.setAttribute('multiple', '')
            uploader.classList.add('hidden')

            document.body.appendChild(uploader)

            uploader.click()
            uploader.onchange = async () => {
                let file = uploader.files[0]
                let fr = new FileReader()
                fr.readAsArrayBuffer(file)
                fr.onload = async () => {
                    let data = fr.result
                    await Endpoints.upload(file.name, data)
                    this.$store.dispatch('fileUploaded')
                }
            }
            uploader.remove()
        },
        async logout() {
            await this.$store.dispatch('logout')
            await this.$router.push({ name: 'Login' })
        }
    },
    async created() {
        const { data } = await Endpoints.diskspace()
        this.percentage = parseInt(
            ((data.infoSpace.size - data.infoSpace.free) /
                data.infoSpace.size) *
                100
        )
    }
}
</script>

<style lang="sass" scoped>
#disk-bar
  position: absolute !important
  top: 32%
  z-index: 1
  background: transparent

div
    color: #000
    padding: 0.2rem
    background: var(--menu)
    text-align: center

h3
    margin: auto
    padding: 0

#disk-container
    position: relative
    background: #FFF
    border-radius: 10px
    width: 60px
    height: 80px
    margin: auto

ul
    margin: auto
    list-style: none
    padding: 0

li
    margin-bottom: 40px

img
    width: 40px
    height: 40px
    cursor: pointer
</style>
