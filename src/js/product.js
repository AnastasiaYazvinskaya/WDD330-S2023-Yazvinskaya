import { getParams, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const productId = getParams("product");
//console.log(dataSource.findProductById(productId));

const product = new ProductDetails(productId, dataSource);
product.init();
