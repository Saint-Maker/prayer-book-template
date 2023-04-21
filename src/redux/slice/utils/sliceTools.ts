import { idb } from '~utils/idb'

export const sliceGet = async (tableName: string, defaultData?: any[]) => {
    let items = (await idb.readData(tableName)) || []
    if (defaultData !== undefined && items.length === 0) {
        items = defaultData
        await idb.writeData(tableName, items)
    }
    return items
}

export const sliceSet = async (items: any[], tableName: string) => {
    return idb.writeData(tableName, items)
}

export const sliceAdd = async (item: any, tableName: string) => {
    const data = (await idb.readData(tableName)) || []
    return idb.writeData(tableName, [item, ...data])
}

export const sliceEdit = async (editedItem: any, tableName: string) => {
    const data = (await idb.readData(tableName)) || []
    const updatedPrayers = data.map((item: any) => {
        if (item.id === editedItem.id) return editedItem
        return item
    })
    return idb.writeData(tableName, updatedPrayers)
}

export const sliceDeleteSingle = async (id: string, tableName: string) => {
    const data = (await idb.readData(tableName)) || []
    return idb.writeData(
        tableName,
        data.filter((item: any) => item.id !== id),
    )
}

export const sliceDeleteAll = async (tableName: string) => {
    return idb.writeData(tableName, [])
}
