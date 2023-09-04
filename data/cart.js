export const cart = [];
//Funciones
//Agregar al carrito
export const addToCart = (productId) => {
    let productoDetectado; //Producto sobre el cual se trabaja.
    cart.forEach((cartItem) => {
        if (productId === cartItem.id) //Si existe el productname que viene del data set en el lugar del objeto con el mismo nombre
        {
          productoDetectado = cartItem; //Producto detectado ahora es igual al item en memoria.
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