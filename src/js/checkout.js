import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", "#order-summary");
myCheckout.init();

document
  .querySelector("#zip")
  .addEventListener("change", myCheckout.calculateOrdertotal.bind(myCheckout));
    // listening for click on the button
    document.querySelector("#button").addEventListener("click", (e) => {
  e.preventDefault();

  myCheckout.checkout();
});
