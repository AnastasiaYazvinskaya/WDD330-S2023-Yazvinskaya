import { getParams, loadHeaderFooter } from "./utils.mjs";
//import ProductData from "./ProductData.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParams("category");
//const dataSource = new ProductData();
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const list = new ProductList(category, dataSource, element);

list.init();


