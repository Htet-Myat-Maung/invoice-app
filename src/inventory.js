import { chooseProduct, newProductName, newProductPrice, productCardTemplate, productList } from "./selectors";
import { v4 as uuidv4 } from 'uuid';
import { products } from "./states";

export const newProductAddBtnHandler = () => {
    const productId = uuidv4();

    productList.append(createProductCard(productId, newProductName.value, newProductPrice.valueAsNumber));

    chooseProduct.append(new Option(`${newProductName.value} - ${newProductPrice.valueAsNumber}`, productId));

    products.push({
        id: productId,
        name: newProductName.value,
        price: newProductPrice.valueAsNumber
    });

    // console.log(products);

    newProductName.value = null;
    newProductPrice.value = null;
}

export const productRender = (products) => {
    products.forEach(({id, name, price}) => {
        productList.append(createProductCard(id, name, price));
        chooseProduct.append(new Option(`${name} - ${price}`, id))
    });
}

export const createProductCard = (id, name, price) => {
    const productCard = productCardTemplate.content.cloneNode(true);
    const currentProductCard = productCard.querySelector(".product-card");
    const productName = productCard.querySelector(".product-name");
    const productPrice = productCard.querySelector(".product-price");

    currentProductCard.id = id;

    productName.innerText = name;
    productPrice.innerText = price;

    return productCard;
}