const getLocalStorage = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return data;
  } catch (err) {
    throw new Error(err as string);
  }
};

const setLocalStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    throw new Error(err as string);
  }
};

export const getCartItems = () => {
  const cartItems = getLocalStorage('cartItems');

  return cartItems;
};

type CartValue = Map<string, number>;

export const setCartItems = (cartItems: CartValue) => {
  setLocalStorage('cartItems', JSON.stringify(cartItems));
};
