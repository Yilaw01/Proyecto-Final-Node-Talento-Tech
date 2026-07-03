//Req. 6
//Esta capa de servivio llama al modelo (modelos/productos_modelo.js),
//que es quien realmente habla con la base de datos.
// El controlador nunca toca Firestore directamente.

import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct
} from '../modelos/product.model.js';
 
// Devuelve todos los productos
export const obtenerProductos = async () => {
  return getAllProducts();
};
 
// Busca un producto por su id
export const obtenerProductoPorId = async (id) => {
  return getProductById(id);
};
 
// Crea un nuevo producto
export const crearProducto = async (nuevoProducto) => {
  return createProduct(nuevoProducto);
};
 
// Elimina un producto por id, devuelve true si lo encontró y borró
export const eliminarProducto = async (id) => {
  return deleteProduct(id);
};