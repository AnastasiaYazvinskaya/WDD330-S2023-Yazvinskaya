import { getLocalStorage, setLocalStorage, alertMessage} from "./utils.mjs";

/* This script file will contain the code to dynamically produce the product detail pages. */
function productDetailsTemplate(product) {
    return `<section class="product-detail">
        <h3>${product.Brand.Name}</h3>
        <h2 class="divider">${product.NameWithoutBrand}</h2>
        <img
        class="divider"
        src="${product.Images.PrimaryLarge}"
        alt="${product.NameWithoutBrand}"
        />
        <p class="product-card__price">$${product.FinalPrice}</p>
        <p class="product__color">${product.Colors[0].ColorName}</p>
        <p class="product__description">${product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
    </section>
    <div class="product-detail">
        <div id="comments"></div>
        <h2>Comment</h2>
        <textarea id="comment" rows="5" cols="60"></textarea>
        <button id="commentBtn">Add Comment</button>
    <div>`;
  }
  function commentDetailsTemplate(comment){
    const currentTime = new Date;
    return `<p><strong>${comment}</strong></p>
                      <p>${currentTime}</p>
                      <hr>`;
  }
  
  export default class ProductDetails {
    constructor(productId, dataSource) {
      this.productId = productId;
      this.product = {};
      this.dataSource = dataSource;
    }
    async init(){
        this.product = await this.dataSource.findProductById(this.productId);
        console.log(this.product);
        this.renderProductDetails("main");
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addToCart.bind(this));
        document
            .getElementById("commentBtn")
            .addEventListener("click", this.createComments.bind(this));
    }
    addToCart(product) {
        let content = getLocalStorage("so-cart");
        if (!content || content.isTrusted) {
            content = [];
        }
        //content.push(this.product);
        const existingItem = content.find((item) => item.Id === this.product.Id);
        if (existingItem) {
          existingItem.Quantity++;
        }
        else {
          this.product.Quantity = 1
          content.push(this.product);
        }
        setLocalStorage("so-cart", content);
        alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
    }
    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        element.insertAdjacentHTML(
            "afterBegin",
            productDetailsTemplate(this.product)
        );
    }
    createComments(){
      this.product.Comments = document.getElementById("comment").value;
      if (this.product.Comments != ""){
        let commentPlace = document.getElementById("comments");
        commentPlace.insertAdjacentHTML(
          "afterBegin",
          commentDetailsTemplate(document.getElementById("comment").value)
          );
          document.getElementById("comment").value = "";
      }
    }

  }