// Detect if we're running in Chrome extension environment
const isExtension = typeof chrome !== 'undefined' && chrome.storage;

// Fallback storage for development environment
const localStore = {
  data: new Map(),
  get: async (keys) => {
    const result = {};
    keys.forEach(key => {
      result[key] = localStore.data.get(key);
    });
    return result;
  },
  set: async (items) => {
    Object.entries(items).forEach(([key, value]) => {
      localStore.data.set(key, value);
    });
  }
};

// Use Chrome storage if available, otherwise use local fallback
const storage = isExtension ? chrome.storage.local : localStore;

export async function saveLastUrl(url) {
  await storage.set({ lastUrl: url });
}

export async function getLastUrl() {
  const result = await storage.get(['lastUrl']);
  return result.lastUrl || '';
}