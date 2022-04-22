export default class Helpers {
    static downloadBlob(blob, name) {
        if (window.navigator && window.navigator.msSaveOrOpenBlob)
            return window.navigator.msSaveOrOpenBlob(blob.data)
        const data = window.URL.createObjectURL(blob.data)

        const link = document.createElement('a')
        link.href = data
        link.download = name

        link.dispatchEvent(
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            })
        )

        setTimeout(() => {
            window.URL.revokeObjectURL(data)
            link.remove()
        }, 100)
    }

    diskQuota = new ProgressBar.Circle('#disk-quota-progressbar', {
        color: '#000',
        strokeWidth: 4,
        easing: 'easeInOut',
        duration: 1400,
        text: {
            value: '0%'
        }
    })

    static stringifySize(size) {
        if (size > 1073741824) {
            size = (size / 1073741824).toFixed(2) + ' GB'
        } else if (size > 1048576) {
            size = (size / 1048576).toFixed(2) + ' MB'
        } else if (size > 1024) {
            size = (size / 1024).toFixed(0) + ' KB'
        } else {
            size = size + ' B'
        }
        return size
    }
}
