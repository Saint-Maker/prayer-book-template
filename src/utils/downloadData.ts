export const downloadData = (data: any, fileName: any) => {
    const stringifiedData = JSON.stringify(data)
    const blob = new Blob([stringifiedData], { type: 'text/json' })
    const anchor = document.createElement('a')
    anchor.download = `${fileName}.json`
    anchor.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
    })
    anchor.dispatchEvent(clickEvt)
    anchor.remove()
}
