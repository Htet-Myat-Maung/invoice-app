import { manageInventoryBtn, productSideBars } from "./selectors";

export const manageInventoryBtnHandler = () => {
    productSideBars.classList.remove("translate-x-full");
    productSideBars.classList.add("duration-300")
}

export const closeSideBarBtnHandler = () => {
    productSideBars.classList.add("translate-x-full")
}

export const checkOutBtnHandler = () => {
    console.log("u check out");
    window.print()
}