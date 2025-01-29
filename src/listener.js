import { checkOutBtnHandler, closeSideBarBtnHandler, manageInventoryBtnHandler } from "./handlers";
import { newProductAddBtnHandler } from "./inventory";
import { createRecordFormHandler, recordGroupHandler } from "./record";
import { checkOut, closeSideBarBtn, createRecordForm, manageInventoryBtn, newProductAddBtn } from "./selectors";

const listener = () => {
    manageInventoryBtn.addEventListener("click", manageInventoryBtnHandler);
    closeSideBarBtn.addEventListener("click", closeSideBarBtnHandler);
    newProductAddBtn.addEventListener("click", newProductAddBtnHandler);
    createRecordForm.addEventListener("submit", createRecordFormHandler);
    recordList.addEventListener("click", recordGroupHandler)
    checkOut.addEventListener("click", checkOutBtnHandler)
}

export default listener;