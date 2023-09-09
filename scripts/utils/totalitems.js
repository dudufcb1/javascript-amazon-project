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