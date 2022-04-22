import * as fs from 'fs'
import md5 from 'md5'

interface File {
    name: string
    size: string | number
    type?: string
    path: string
}

interface FileDetails extends File {
    hash?: string
    preview?: string | null
}

export default class FileManager {
    public rootFolder: string

    constructor(rootFolder: string) {
        this.rootFolder = `${rootFolder}/`
    }

    getFiles(path: string = ''): File[] {
        let files: File[] = []

        fs.readdirSync(`${this.rootFolder}${path}`).forEach((file) => {
            files.push({
                name: file,
                size: fs.statSync(this.rootFolder + file).size,
                type: fs.statSync(this.rootFolder + file).isDirectory()
                    ? 'dir'
                    : 'file',
                path:
                    this.rootFolder.substring(
                        this.rootFolder.indexOf('files') + 5,
                        this.rootFolder.length
                    ) + file
            })
        })

        return files
    }

    getDetails(name: string): FileDetails {
        let file = fs.readFileSync(this.rootFolder + name)
        let stats = fs.statSync(this.rootFolder + name)
        let imgExts = ['png', 'jpg', 'jpeg', 'gif', 'svg']
        return {
            name: name,
            size: stats.size,
            path:
                this.rootFolder.substring(
                    this.rootFolder.indexOf('files') + 5,
                    this.rootFolder.length
                ) + name,
            hash: md5(file),
            preview: imgExts.some((ext) => ext === name.split('.').pop())
                ? `data:image/png;base64,${file.toString('base64')}`
                : null
        }
    }

    async deleteFile(name: string): Promise<boolean> {
        try {
            fs.unlinkSync(this.rootFolder + name)
            return true
        } catch (e) {
            return false
        }
    }

    async makeDirectory(name: string): Promise<boolean> {
        try {
            fs.mkdirSync(this.rootFolder + name)
            return true
        } catch (e) {
            return false
        }
    }
    async deleteDirectory(name: string): Promise<boolean> {
        try {
            fs.rmdirSync(this.rootFolder + name)
            return true
        } catch (e) {
            return false
        }
    }
}
