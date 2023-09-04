import {cart} from '../data/cart.js';
import {products} from '../data/products.js';
let productosRenderizados = '';

products.forEach((products) => {
  productosRenderizados += `
      <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${products.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
      ${products.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${products.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${products.rating.count}
        </div>
      </div>

      <div class="product-price">
      ${(products.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="js-selector-value">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-dynamic">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${products.id}">
        Add to Cart
      </button>
    </div>

      
      `;

});

const productosContainer = document.querySelector('.js-productos-dinamicos');
productosContainer.innerHTML = productosRenderizados;
const cartQuantityLive = document.querySelector('.js-cart-quantity');
let timeoutId;

const addToCart = (productId) => {
  let productoDetectado; //Producto sobre el cual se trabaja.
  cart.forEach((item) => {
      if (productId === item.id) //Si existe el productname que viene del data set en el lugar del objeto con el mismo nombre
      {
        productoDetectado = item; //Producto detectado ahora es igual al item en memoria.
      }
      }
      );
      if (productoDetectado) {
        productoDetectado.quantity++;
      }
      else {
        cart.push({
          id: productId,
          quantity: 1
        });
      }
}

const updateCartQuantity = () => {
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  }
  );
  cartQuantityLive.innerText = totalQuantity;
}


document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId; //Obtenemos el dato a trabajar como referencia.
        });
  });



