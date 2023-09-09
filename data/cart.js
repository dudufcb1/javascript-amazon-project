export let cart = JSON.parse(localStorage.getItem('cart'));

if(cart.length===0){ 
    cart = [
    {productId:'a93a101d-79ef-4cf3-a6cf-6dbe532a1b4a',quantity:1},
    {productId:'8b5a2ee1-6055-422a-a666-b34ba28b76d4',quantity:3},
    {productId:'19c6a64a-5463-4d45-9af8-e41140a4100c',quantity:2},
];
}

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
            productId: productId,
            quantity: 1
          });
        }
        saveToStorage();
        console.log(cart);
  }

export const removeFromCart = (productId) => {
    const newCart = [];
    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId){
          console.log('Si '+ cartItem.productId + 'Es diferente a: ' + productId);   
            
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    saveToStorage();    
    }
    
const saveToStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
}