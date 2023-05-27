import { getParams, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParams("category");
console.log(category);
const dataSource = new ProductData(category);
console.log(dataSource);
const element = document.querySelector(".product-list");
console.log(element);
const list = new ProductList(category, dataSource, element);
console.log(list);

list.init();