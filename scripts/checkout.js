import {cart, removeFromCart, updateCart} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { updateCartQuantity, updateGridItems } from './utils/totalitems.js';
let renderHtmlCart = ''; // Creo variable por fuera para ACUMULAR las iteraciones.

//Funcion general para crear el HTML
cart.forEach((cartItem) => {
    const productInfo = cartItem.productId; //Obtenemos el ID a trabajar y lo asignamos a productinfo.
    
    
    let matchingProduct; //Declaramos la variable que nos servirá para almacenar el producto matcheado en cada iteración
    


    products.forEach((product) => {
            if (productInfo === product.id){
            matchingProduct = product;
    
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
            Quantity: <span class="quantity-label js-quantity-grid-${cartItem.productId}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-product js-class-update-${cartItem.productId}" data-product-id="${cartItem.productId}">
            Update
            </span>
            <input class="quantity-input update-input update-input-onload-${cartItem.productId} hidden js-input-quantity" data-product-id="${cartItem.productId}">
            <span class="save-quantity-link link-primary save-label save-label-onload-${cartItem.productId} hidden" data-product-id="${cartItem.productId}">Save</span>
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
    const estadoInicial = {};
    const elemento = document.querySelector('.js-checkout-item-counter');
    updateCartQuantity(elemento, 'items');
    
    
    let botonEditar;
    const botonesEditar = document.querySelectorAll('.js-update-product');
    const updateLink = document.querySelectorAll('.save-label');
    botonesEditar.forEach((botonEditar)=>{
        botonEditar.addEventListener('click', ()=> {
        let productId = botonEditar.dataset.productId; // Simplemente obtengo el ID a trabajar.
        let readyToShow = document.querySelector(`.update-input-onload-${productId}`);
        let saveLabel = document.querySelector(`.save-label-onload-${productId}`);
        botonEditar.classList.add('hidden');
        readyToShow.classList.remove('hidden');         
        saveLabel.classList.remove('hidden');   
        
        })
        

    });
    
    
    updateLink.forEach((botonGuardar) => {
        let productId = botonGuardar.dataset.productId; // Simplemente obtengo el ID a trabajar.
        let readyToShow = document.querySelector(`.update-input-onload-${productId}`);
        let saveLabel = document.querySelector(`.save-label-onload-${productId}`);
        let updateButton = document.querySelector(`.js-class-update-${productId}`);
        botonGuardar.addEventListener('click', () => {
            let input = document.querySelector(`.update-input-onload-${productId}`);
            let newQuantity = Number(input.value);       
            if(newQuantity >0 && newQuantity < 1000){
            updateCart(productId, newQuantity);
            updateButton.classList.remove('hidden');
            readyToShow.classList.add('hidden');         
            saveLabel.classList.add('hidden');           
            updateGridItems(productId, newQuantity);
            updateCartQuantity(elemento, 'items');
            }
            else{
                alert('Add a real quantity');
            }
           
        });
    });

    let inputQuantity = document.querySelectorAll('.js-input-quantity');
    inputQuantity.forEach((inputGuardar) => {
        let productId = inputGuardar.dataset.productId; // Simplemente obtengo el ID a trabajar.
        let readyToShow = document.querySelector(`.update-input-onload-${productId}`);
        let saveLabel = document.querySelector(`.save-label-onload-${productId}`);
        let updateButton = document.querySelector(`.js-class-update-${productId}`);
         inputGuardar.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { // Cambiado de e.code a e.key
                e.preventDefault(); // Esto evitará que se procese el evento "Enter" por defecto (como enviar un formulario).
                
                let input = document.querySelector(`.update-input-onload-${productId}`);
                let newQuantity = Number(input.value);
                
                if (newQuantity > 0 && newQuantity < 1000) {
                    updateCart(productId, newQuantity);
                    updateButton.classList.remove('hidden');
                    readyToShow.classList.add('hidden');
                    saveLabel.classList.add('hidden');
                    updateGridItems(productId, newQuantity);
                    updateCartQuantity(elemento, 'items');
                } else {
                    alert('Agrega una cantidad válida');
                }
            }
        });
        
    });
    