import localForage from 'localforage';

export default {
  writeData: (key: string, data: unknown[]): Promise<unknown[]> => {
    return localForage.setItem(key, data);
  },
  readData: (key: string): Promise<unknown[] | null> => {
    return localForage.getItem(key);
  },
};
