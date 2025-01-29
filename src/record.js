import Swal from "sweetalert2";
import { createRecordForm, recordList, recordNetTotal, recordRowTemplate, recordTax, recordTotal } from "./selectors";
import { products } from "./states";
import { v4 as uuidv4 } from 'uuid';

export const createRecordFormHandler = (event) => {
    event.preventDefault();
    // console.log("u submit");
    const formData = new FormData(createRecordForm);
    // console.log(formData.get("choose_product"));
    // console.log(formData.get("quantity"));

    const currentProduct = products.find(({id}) => id == formData.get("choose_product"))
    
    const isExitedRecord = document.querySelector(`[product-id = '${currentProduct.id}']`)
    if(isExitedRecord === null){
        recordList.append(createRecordRow(currentProduct, formData.get("quantity")));
    }else {
        Swal.fire({
            title: "Are you sure to add?",
            text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, add it!"
          }).then((result) => {
            if (result.isConfirmed) {
                updateRecordQuantity(isExitedRecord.id, parseInt(formData.get("quantity")))
            }
          });
    }

    createRecordForm.reset();

    
}

export const createRecordRow = ({id, name, price}, quantity) => {
    const recordRow = recordRowTemplate.content.cloneNode(true);
    const currentRecordRow = recordRow.querySelector(".record-row");
    const recordProductName = recordRow.querySelector(".record-product-name");
    const recordProductPrice = recordRow.querySelector(".record-product-price");
    const recordQuantity = recordRow.querySelector(".record-quantity");
    const recordCost = recordRow.querySelector(".record-cost");

    currentRecordRow.setAttribute("product-id", id);
    currentRecordRow.id = `record${uuidv4()}`; //dynamic id


    recordProductName.innerText = name;
    recordProductPrice.innerText = price;
    recordQuantity.innerText = quantity;
    recordCost.innerText = price * quantity;

    return recordRow;
};


export const calculateRecordCostTotal = () => {
    let total = 0;
    recordList.querySelectorAll(".record-cost").forEach((el) => (total += parseFloat(el.innerText)));
    
    return total;
}

export const calculateTax = (amount, taxRate = 5) => {
    return (amount / 100) * taxRate;
};

export const recordRemove = (rowId) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            const currentRecordRow = document.querySelector(`#${rowId}`);
            currentRecordRow.remove();

            const total = calculateRecordCostTotal();
            const tax = calculateTax(total);

            recordTotal.innerText = total;
            recordTax.innerText = tax;
            recordNetTotal.innerText = total + tax;
        }
      });
};

export const recordAdd = (rowId) => {
    const currentRecordRow = document.querySelector(`#${rowId}`);
    const recordProductPrice = currentRecordRow.querySelector(".record-product-price");
    const recordQuantity = currentRecordRow.querySelector(".record-quantity");
    const recordCost = currentRecordRow.querySelector(".record-cost");

    recordQuantity.innerText = parseInt(recordQuantity.innerText) + 1;
    recordCost.innerText = parseInt(recordProductPrice.innerText * recordQuantity.innerText);
}

export const recordSub = (rowId) => {
    const currentRecordRow = document.querySelector(`#${rowId}`);
    const recordProductPrice = currentRecordRow.querySelector(".record-product-price");
    const recordQuantity = currentRecordRow.querySelector(".record-quantity");
    const recordCost = currentRecordRow.querySelector(".record-cost");

    if(recordQuantity.innerText > 1) {
        recordQuantity.innerText = parseInt(recordQuantity.innerText)-1;
        recordCost.innerText = parseInt(recordProductPrice.innerText * recordQuantity.innerText);
    }
}

export const updateRecordQuantity = (rowId, newQuantity) => {
    const currentRecordRow = document.querySelector(`#${rowId}`);
    const recordProductPrice = currentRecordRow.querySelector(".record-product-price");
    const recordQuantity = currentRecordRow.querySelector(".record-quantity");
    const recordCost = currentRecordRow.querySelector(".record-cost");

    if(newQuantity > 0 || recordQuantity.innerText > 1){
        recordQuantity.innerText = parseInt(recordQuantity.innerText) + newQuantity;
        recordCost.innerText = parseInt(recordProductPrice.innerText * recordQuantity.innerText);
    }
}

export const recordGroupHandler = (event) => {
    if(event.target.classList.contains("remove-record")){
        const currentRecordRow = event.target.closest(".record-row");
        recordRemove(currentRecordRow.id);
        // recordRemove();
    }else if(event.target.classList.contains("quantity-add")){
        const currentRecordRow = event.target.closest(".record-row");
        updateRecordQuantity(currentRecordRow.id, 1)
    } else if(event.target.classList.contains("quantity-sub")){
        const currentRecordRow = event.target.closest(".record-row");
        updateRecordQuantity(currentRecordRow.id, -1)
    }
}

export const recordListObserver = () => {
    const observerOptions = {
        childList: true,
        subtree: true,
      };

      const updateTotal = () => {
        const total = calculateRecordCostTotal();
        const tax = calculateTax(total);

        recordTotal.innerText = total;
        recordTax.innerText = tax;
        recordNetTotal.innerText = total + tax;
      }
      
      const observer = new MutationObserver(updateTotal);
      observer.observe(recordList, observerOptions);
}