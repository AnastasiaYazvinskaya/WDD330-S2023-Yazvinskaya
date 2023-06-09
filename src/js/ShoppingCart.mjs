import { getLocalStorage } from "./utils.mjs";

/* Generate a list of product cards in HTML from an array */
function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
    <a href="../product_pages/index.html?product=${item.Id}" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
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
      this.total = 0;
    }
    async init(){
        const list = getLocalStorage(this.key);
        this.renderCartContents(list);
    }
    renderCartContents(cartItems) {
        //const cartItems = getLocalStorage(this.key);
        if (cartItems) {
          this.calculateTotal(cartItems);
          const htmlItems = cartItems.map((item) => cartItemTemplate(item));
          document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
          document.querySelector(".total-price").innerText += ` $${this.total}`;
          document.querySelector(".total").classList.remove("hide");
        } else {
          document.querySelector(
            this.parentSelector
          ).innerHTML = `<p>There are no items in the cart.</p>`;
        }
      }
    calculateTotal(list) {
      const amounts = list.map((item) => item.FinalPrice);
      this.total = amounts.reduce((sum, item) => sum + item);
    }
}