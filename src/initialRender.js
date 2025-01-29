import { productRender } from "./inventory";
import { productSideBars } from "./selectors";
import { products } from "./states";

const initialRender = () => {
    //open side bar
    // productSideBars.classList.remove("translate-x-full");
    productRender(products)
}

export default initialRender;