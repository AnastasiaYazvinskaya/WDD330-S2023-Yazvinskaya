import { getLocalStorage } from "./utils.mjs";

/* Generate a list of product cards in HTML from an array */
function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
  
    return newItem;
  }

export default class ShoppingCart {
    constructor(key, parentSelector) {
      this.key = key;
      this.parentSelector = parentSelector;
    }
    async init(){
        this.renderCartContents();
    }
    renderCartContents() {
        const cartItems = getLocalStorage(this.key);
        console.log(cartItems);
        if (cartItems) {
          const htmlItems = cartItems.map((item) => cartItemTemplate(item));
          document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
        } else {
          document.querySelector(
            this.parentSelector
          ).innerHTML = `<p>There are no items in the cart.</p>`;
        }
      }
}