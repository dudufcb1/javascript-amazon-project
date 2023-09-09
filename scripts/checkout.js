import {cart, removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { updateCartQuantity } from './utils/totalitems.js';
let renderHtmlCart = ''; // Creo variable por fuera para ACUMULAR las iteraciones.

//Funcion general para crear el HTML
cart.forEach((cartItem) => {
    const productInfo = cartItem.productId; //Obtenemos el ID a trabajar y lo asignamos a productinfo.
    console.log('Este valor que?', productInfo)
    
    let matchingProduct; //Declaramos la variable que nos servirá para almacenar el producto matcheado en cada iteración
    
    console.log("productInfo:", productInfo);

    products.forEach((product) => {
        console.log("product.id:", product.id);
        if (productInfo === product.id){
            matchingProduct = product;
            console.log('Matching Product:', matchingProduct);
        }
    });
    
        
    let cartItemHtml = 
    `
  <div class="cart-item-container js-cart-${cartItem.productId}">
    <div class="delivery-date">
        Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">

        <div class="cart-item-details">
        <div class="product-name">
        ${matchingProduct.name}
        </div>
        <div class="product-price">
        ${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
            <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-product" data-product-id="${cartItem.productId}">
            Update
            </span>
            <input class="quantity-input">
            <span class="save-quantity-link link-primary">Save</span>
            <span class="delete-quantity-link link-primary js-delete-product" data-product-id="${cartItem.productId}">
            Delete
            </span>
        </div>
        </div>

        <div class="delivery-options">
        <div class="delivery-options-title">
            Choose a delivery option:
        </div>
        <div class="delivery-option">
            <input type="radio" checked="" class="delivery-option-input" name="delivery-option-${cartItem.productId}">
            <div>
            <div class="delivery-option-date">
                Tuesday, June 21
            </div>
            <div class="delivery-option-price">
                FREE Shipping
            </div>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-${cartItem.productId}">
            <div>
            <div class="delivery-option-date">
                Wednesday, June 15
            </div>
            <div class="delivery-option-price">
                $4.99 - Shipping
            </div>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-${cartItem.productId}">
            <div>
            <div class="delivery-option-date">
                Monday, June 13
            </div>
            <div class="delivery-option-price">
                $9.99 - Shipping
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
    `;
    renderHtmlCart += cartItemHtml;
    })
    let cartHtml = document.querySelector('.js-cart-content');
    cartHtml.innerHTML = renderHtmlCart;


    const botonesEliminar = document.querySelectorAll('.js-delete-product');

    botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', () => {
            let productId = boton.dataset.productId;
            removeFromCart(productId);
            updateCartQuantity(elemento, 'items');
            const container = document.querySelector(
                `.js-cart-${productId}
                `
            )
            container.remove();
            if (cart.length===0){
                document.querySelector('.js-cart-content').innerText = 'Your cart is empty';
                console.log(cart);
            }
                
        })
    });
    
    const elemento = document.querySelector('.js-checkout-item-counter');

    updateCartQuantity(elemento, 'items');
    

    const botonesEditar = document.querySelectorAll('.js-update-product');
    botonesEditar.forEach((botonEditar)=>{

        botonEditar.addEventListener('click', ()=> {
            console.log('Funciono :)');
        })

    })