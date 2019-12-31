// @ts-check
import { createStore } from "pinia";
import { useUserStore } from "./user";

export const useCartStore = createStore(
  "cart",
  () => ({
    /** @type {string[]} */
    rawItems: []
  }),
  {
    /**
     * @returns {Array<{ name: string; amount: number }>}
     */
    items: state =>
      state.rawItems.reduce((items, item) => {
        const existingItem = items.find(it => it.name === item);

        if (!existingItem) {
          items.push({ name: item, amount: 1 });
        } else {
          existingItem.amount++;
        }

        return items;
      }, [])
  }
);

/**
 * Add item to the cart
 * @param {string} name
 */
export function addItem(name) {
  const store = useCartStore();
  store.state.rawItems.push(name);
}

/**
 * Remove item from the cart
 * @param {string} name
 */
export function removeItem(name) {
  const store = useCartStore();
  const i = store.state.rawItems.lastIndexOf(name);
  if (i > -1) store.state.rawItems.splice(i, 1);
}

export async function purchaseItems() {
  const cart = useCartStore();
  const user = useUserStore();
  if (!user.state.name) return;

  console.log("Purchasing", cart.items.value);
  const n = cart.items.value.length;
  cart.state.rawItems = [];

  return n;
}
