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




document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const addToCartNotify = button.parentElement.querySelector('.js-added-dynamic');  
      addToCartNotify.classList.add('visible');
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        addToCartNotify.classList.remove('visible');
      },2000);    
      const {productId} = button.dataset; //Obtenemos el dato a trabajar como referencia.
      let productoDetectado; //Producto sobre el cual se trabaja.
      const quantityOfProduct = button.parentElement.querySelector('.js-selector-value');  //Obtenermos el valor parent de cada boton. 
      //Al hacer click dinamicamente obtendrá la cantidad de ese producto en especifico.

      cart.forEach((item) => {

          if (productId === item.id) //Si existe el productname que viene del data set en el lugar del objeto con el mismo nombre
          {
            productoDetectado = item; //Producto detectado ahora es igual al item en memoria.
          }
          }
          );
          if (productoDetectado) {
            let cantidadActual = productoDetectado.quantity; //Setemoas la cantidad que traiga de pasadas anterior.
            productoDetectado.quantity = cantidadActual + Number(quantityOfProduct.value);  //Actualizamos con la pasada actual

          }
          else {
            //Agregamos el producto al array en caso de que no exista coincidencia
            cart.push({
              id: productId,
              quantity: Number(quantityOfProduct.value)
            });
          }
          
           let totalQuantity = 0;
           cart.forEach((item) => {
            totalQuantity += item.quantity; // ya salimos del scope anterior, entonces aca volvemos al for each y vamos sumando lo que encontramos para hacer el total y presentarlo
          }
          );
          cartQuantityLive.innerText = totalQuantity; 
          console.log(totalQuantity);
          console.log(cart);
        });
  });



