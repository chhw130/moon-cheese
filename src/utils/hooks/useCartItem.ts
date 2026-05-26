import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'cartItems';

const listeners = new Set<() => void>();
let cachedSnapshot: Map<string, number> | null = null;
let cachedJSON: string | null = null;

const notify = () => {
  listeners.forEach(listener => listener());
};

const getStoredData = (): Map<string, number> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const json = stored || '[]';

    // JSON이 변경되지 않으면 캐시된 객체 반환
    if (cachedJSON === json && cachedSnapshot !== null) {
      return cachedSnapshot;
    }

    cachedJSON = json;
    cachedSnapshot = new Map(JSON.parse(json));
    return cachedSnapshot;
  } catch (error) {
    console.error('Failed to load cart items from localStorage:', error);
    cachedJSON = '[]';
    cachedSnapshot = new Map();
    return cachedSnapshot;
  }
};

const saveToStorage = (cartItems: Map<string, number>) => {
  try {
    const json = JSON.stringify(Array.from(cartItems));
    localStorage.setItem(STORAGE_KEY, json);
    cachedJSON = json;
    cachedSnapshot = cartItems;
  } catch (error) {
    console.error('Failed to save cart items to localStorage:', error);
  }
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const addCartItem = (id: string, quantity = 1) => {
  const current = new Map(getStoredData());
  const existing = current.get(id) ?? 0;
  current.set(id, existing + quantity);
  saveToStorage(current);
  notify();
};

const removeCartItem = (id: string) => {
  const current = new Map(getStoredData());
  const existing = current.get(id) ?? 0;
  const next = existing - 1;

  if (next > 0) {
    current.set(id, next);
  } else {
    current.delete(id);
  }

  saveToStorage(current);
  notify();
};

export const useCartItem = () => {
  const cartItems = useSyncExternalStore(subscribe, getStoredData, () => new Map());

  return { cartItems, addCartItem, removeCartItem };
};
