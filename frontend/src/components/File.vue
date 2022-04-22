<template>
    <div class="file" ref="file-card" @contextmenu="filemenu">
        <h2 :id="fullName">{{ shortenedName }}</h2>
        <img :src="img" :alt="alt" />
        <h3 v-show="newSize">{{ newSize }}</h3>
    </div>
</template>

<script>
import png from '../assets/img.png'
import file from '../assets/file.png'
import doc from '../assets/document.png'
import zip from '../assets/zip.png'
import txt from '../assets/txt.png'
import mp3 from '../assets/mp3.png'
import mp4 from '../assets/mp4.png'
import dir from '../assets/dir.png'
import Helpers from '../services/Helpers'

export default {
    props: {
        fullName: String,
        alt: {
            type: String,
            default: 'icon'
        },
        size: Number,
        extension: String,
        type: String
    },
    methods: {
        filemenu() {
            this.$emit('rClick')
        },
        shortenName(name) {
            // PROUD, dont remove this line
            return name.length > 16
                ? name.replace(
                      name.substring(
                          name.length / 2 - Math.round((name.length - 9) / 2),
                          name.length - 9
                      ),
                      '...'
                  )
                : name
            // x - (name.length - 9)
            // I LOVE COCK AN | D BALLS TORTURE.png
            /*
            I LOVE COCK AND | BALLS TORTURE.png
            c = center
            i = name.length - 16
            c = c - (i / 2)
            (c, i+1) 
            nametrimmer.py
            c = 18
            i = 20
            c = 18 - 10 = 8
            position 8 chars, remove 20 chars
            length = 17
            c = 9
            i = 1
            (9, 2)
            */
        }
    },
    data() {
        return {
            imgs: [
                { img: png, name: 'png' },
                { img: doc, name: 'doc' },
                { img: zip, name: 'zip' },
                { img: txt, name: 'txt' },
                { img: mp3, name: 'mp3' },
                { img: mp4, name: 'mp4' },
                { img: dir, name: 'dir' }
            ],
            shortenedName: this.fullName,
            newSize: null
        }
    },
    mounted() {
        /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
        this.shortenedName = this.shortenName(this.fullName)
        this.$nextTick(() => {
            this.$refs['file-card'].title = this.fullName
        })
        /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
        this.newSize = Helpers.stringifySize(this.size)
    },
    computed: {
        name() {
            return this.fullName
        },
        img() {
            let extIcons = {
                mp4: [
                    'mp4',
                    'webm',
                    'mpeg',
                    'avi',
                    'mov',
                    'flv',
                    'wmv',
                    'mkv',
                    'm4v'
                ],
                mp3: ['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a'],
                png: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'],
                doc: [
                    'doc',
                    'docx',
                    'pdf',
                    'odt',
                    'rtf',
                    'tex',
                    'txt',
                    'wks',
                    'wps',
                    'wpd',
                    'ods',
                    'xlr',
                    'xls',
                    'xlsx',
                    'csv',
                    'ppt',
                    'pptx',
                    'pps',
                    'ppsx',
                    'odp',
                    'key',
                    'odb',
                    'odg',
                    'odf',
                    'odm',
                    'ott',
                    'ots',
                    'otp',
                    'otg',
                    'odc',
                    'odf',
                    'odk',
                    'xsl',
                    'xsd',
                    'json',
                    'yaml',
                    'yml',
                    'yml',
                    'yaml',
                    'ini',
                    'conf',
                    'cfg',
                    'toml'
                ],
                zip: [
                    'zip',
                    'rar',
                    '7z',
                    'tar',
                    'gz',
                    'bz2',
                    'xz',
                    'z',
                    'jar',
                    'iso',
                    'deb',
                    'rpm',
                    'cab',
                    'arj',
                    'lzh',
                    'lha',
                    'ace',
                    'bz',
                    'bz2',
                    'dmg',
                    'xar',
                    'iso',
                    'jar',
                    'apk',
                    'dwg',
                    'dxf',
                    'cdr',
                    'wad',
                    'swf',
                    'fla',
                    'asf',
                    'asx',
                    'wax',
                    'wm',
                    'wmx',
                    'wvx',
                    'wmv',
                    'wma',
                    'qt'
                ],
                dir: ['dir']
            }

            if (this.type === 'dir') {
                return dir
            }
            let ext = this.fullName.split('.').pop()
            for (const key in extIcons) {
                if (extIcons[key].includes(ext)) {
                    let image = null
                    for (let i = 0; i < this.imgs.length; ++i) {
                        if (this.imgs[i].name === key) {
                            image = this.imgs[i].img
                            break
                        }
                    }
                    return image
                }
            }
            return file
        }
    }
}
</script>

<style lang="sass" scoped>

.file
    display: inline-block
    border-radius: 5px
    width: 120px
    min-height: 110px
    font-size: 0.6em
    color: #fff
    background: #333a
    border: 1px solid #ccc6
    padding: 5px
    margin: 5px
    text-align: center

h2
    pointer-events: none
    margin: 0

h3
    pointer-events: none
    font-size: 1.5em
    margin: 0

img
    pointer-events: none
    width: 50px
    height: 50px
    user-select: none
</style>
