<template>
    <div id="file-list" @contextmenu="showCM($event)">
        <File
            v-show="allFiles"
            v-for="(file, i) in allFiles"
            :key="i"
            :fullName="file.name"
            :size="file.size"
            :extension="file.extension"
            :type="file.type"
        />
        <ContextMenu ref="menu" />
    </div>
</template>

<script>
import Endpoints from '../services/Endpoints'
import File from '../components/File.vue'
import ContextMenu from '../components/ContextMenu.vue'
export default {
    name: 'Dashboard',
    data() {
        return {
            allFiles: [],
            selectedFile: {}
        }
    },
    methods: {
        showCM(event) {
            this.$refs.menu.show(event)
        },
        async updateFiles() {
            try {
                const allFiles = await Endpoints.files()
                this.allFiles = []
                allFiles.forEach((file) => {
                    const extension = file.name.split('.').pop()
                    this.allFiles.push({
                        name: file.name,
                        extension: extension,
                        size: file.size,
                        type: file.type
                    })
                })
            } catch (e) {
                // TODO: handle error log
                console.log(e)
            }
        }
    },
    async created() {
        await this.updateFiles()
    },
    computed: {
        store() {
            return this.$store.state.fileUploaded
        }
    },
    components: {
        File,
        ContextMenu
    },
    watch: {
        store: async function () {
            console.log('updadsafsafsafsafasdted')
            await this.updateFiles()
        }
    }
}
</script>

<style lang="sass" scoped>
div
    border-top-left-radius: 10px
    border-top-left: 5px solid var(--menu)
</style>
