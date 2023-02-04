export const lsSet = (key: string, item: string) => {
    localStorage.setItem(key, item)
}

export const lsGet = (key: string) => {
    return localStorage.getItem(key)
}
