import { cart } from "../../data/cart.js";
export const updateCartQuantity = (element, text) => {
        let totalQuantity = 0;
        cart.forEach((cartItem) => {
          totalQuantity += cartItem.quantity;
        });
        if(text) {
          element.innerText = `${totalQuantity} ${text}`; 
        } else {
          element.innerText = totalQuantity;
        }
      } 

export const updateGridItems = (productId, newValue) => {
  let updatedSpan = document.querySelector(`.js-quantity-grid-${productId}`);
  updatedSpan.innerText = newValue;
}