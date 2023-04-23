export const uploadData = (event: any, uploadLogic: (data: any) => void, errorLogic: () => void) => {
    const fileReader = new FileReader()
    fileReader.readAsText(event.target.files[0], 'UTF-8')
    fileReader.onload = (e) => {
        const stringResult: string = e.target !== null ? (e.target.result as string) : ''
        try {
            const result = JSON.parse(stringResult)
            uploadLogic(result)
        } catch (e) {
            errorLogic()
        } finally {
            event.target.value = ''
        }
    }
}
