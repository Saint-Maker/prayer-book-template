import localForage from 'localforage'

export const idb = {
    writeData: (key: string, data: unknown[]): Promise<unknown[]> => {
        return localForage.setItem(key, data)
    },
    readData: (key: string): Promise<unknown[] | null> => {
        return localForage.getItem(key)
    },
    writeObject: (key: string, data: unknown): Promise<unknown> => {
        return localForage.setItem(key, data)
    },
    readObject: (key: string): Promise<unknown | null> => {
        return localForage.getItem(key)
    },
}
