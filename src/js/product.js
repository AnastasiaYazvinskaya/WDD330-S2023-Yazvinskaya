import { getParams, loadHeaderFooter } from "./utils.mjs";
//import ProductData from "./ProductData.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

//const dataSource = new ProductData("tents");
const dataSource = new ExternalServices("tents");
const productId = getParams("product");
//console.log(dataSource.findProductById(productId));

const product = new ProductDetails(productId, dataSource);
product.init();
