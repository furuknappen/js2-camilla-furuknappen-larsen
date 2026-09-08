
 const createStorage = (storageType: "local" | "session") => {
  const store = storageType == "local" ? localStorage : sessionStorage;
  return {
    save<T>(key: string, value: T): void {
      store.setItem(key, JSON.stringify(value));
    },

    load<T>(key: string): T | null {
      const item = store.getItem(key);
      if (!item) return null;
      try {
        return JSON.parse(item) as T;
      } catch (error) {
        console.error(`Error parsing storage key "${key}": `, error);
        return null;
      }
    },

    remove(key: string): void {
      store.removeItem(key);
    }
  };
};

export const localStorageUtil = createStorage("local");
export const sessionStorageUtil = createStorage("session");
