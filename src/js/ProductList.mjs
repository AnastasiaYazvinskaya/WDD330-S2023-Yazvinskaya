import { renderListTemplate } from "./utils.mjs";

/* Generate a list of product cards in HTML from an array */
function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
        <img
            src="${product.Image}"
            alt="${product.name}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p></a>
    </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }
    async init(){
        const list = await this.dataSource.getData();
        this.filterList(list);
        this.renderList(list);
    }
    renderList(list) {
        renderListTemplate(productCardTemplate, this.listElement, list);
    }
    filterList(list) {
        delete list[2];
        delete list[4];
    }
}