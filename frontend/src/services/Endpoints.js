import Helpers from './Helpers.js'
import axios from 'axios'

export default class Endpoints {
    static address = 'https://quicksense.ddns.net:5555'

    static login(credentials) {
        return axios.post(`${Endpoints.address}/api/session/login`, credentials)
    }

    static async files() {
        return axios.get(`${Endpoints.address}/api/utils/files`).then((res) => {
            return res.data
        })
    }

    static async download(fileName) {
        try {
            const res = await axios({
                url: `${Endpoints.address}/api/utils/download`,
                method: 'POST',
                responseType: 'blob',
                data: {
                    name: fileName
                }
            })
            Helpers.downloadBlob(res, fileName)
        } catch (e) {
            console.error(e)
        }
    }

    static async upload(fileName, content) {
        try {
            await axios.post(`${Endpoints.address}/api/utils/upload`, content, {
                headers: {
                    'x-name': fileName
                }
            })
            await Endpoints.files()
        } catch (e) {
            console.error(e)
        }
    }

    static details(fileName) {
        try {
            return axios.post(`${Endpoints.address}/api/utils/details`, {
                name: fileName
            })
        } catch (e) {
            console.error(e)
        }
    }

    static async delete(fileName) {
        const res = await axios.post(`${Endpoints.address}/api/utils/delete`, {
            name: fileName
        })
        return res.status === 200 ? this.files() : 'File not found'
    }

    static rename(fileName, newName) {}

    static diskspace() {
        return axios.get(`${Endpoints.address}/api/utils/diskspace`)
    }

    static startShell() {
        return axios.get(`${Endpoints.address}/api/shell/init`)
    }

    static runShellCommand(command, workingDir) {
        workingDir = workingDir ? workingDir : ''
        return axios.post(`${Endpoints.address}/api/shell/exec`, {
            workingDir,
            command
        })
    }

    static stopShell() {
        return axios.post(`${Endpoints.address}/api/shell/exit`)
    }
}
