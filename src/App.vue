<template>
  <div id="app">
    <h1>Hello Pinia 🍍!</h1>

    <h2>Hello {{ user.state.name }}</h2>

    <form @submit.prevent="addItemToCart">
      <input type="text" v-model="itemName">
      <button>Add</button>
    </form>

    <form @submit.prevent="buy">
      <ul>
        <li v-for="item in cart.items" :key="item.name">
          {{ item.name }} ({{ item.amount }})
          <button @click="removeItem(item.name)" type="button">X</button>
        </li>
      </ul>

      <button :disabled="!user.state.name">Buy</button>
      <button :disabled="!cart.items.length" @click="clearCart" type="button">Clear the cart</button>
    </form>
  </div>
</template>

<script>
import { ref, createComponent } from "@vue/composition-api";
import { useUserStore } from "./stores/user";
import {
  useCartStore,
  removeItem,
  addItem,
  purchaseItems
} from "./stores/cart";

export default createComponent({
  name: "App",
  setup() {
    const user = useUserStore();
    const cart = useCartStore();

    const itemName = ref("");

    function addItemToCart() {
      if (!itemName.value) return;
      addItem(itemName.value);
      itemName.value = "";
    }

    function clearCart() {
      if (window.confirm("Are you sure you want to clear the cart?")) {
        cart.state.rawItems = [];
      }
    }

    async function buy() {
      const n = await purchaseItems();

      console.log(`Bought ${n} items`);

      cart.state.rawItems = [];
    }

    window.stores = { user, cart, addItem, removeItem, addItemToCart };

    return {
      itemName,
      addItemToCart,
      removeItem,
      cart,

      user,
      buy,
      clearCart
    };
  }
});
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
