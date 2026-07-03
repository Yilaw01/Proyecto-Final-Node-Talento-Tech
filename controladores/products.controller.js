// Recibe req/res, le pide los datos al SERVICIO (nunca habla con
// Firestore directamente), y arma la respuesta HTTP con el status correcto.
import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  eliminarProducto
} from "../servicios/products.service.js";
 
// GET /api/products
export const getProducts = async (req, res, next) => {
  try {
    const products = await obtenerProductos();
    res.status(200).json(products);
  } catch (error) {
    // Si Firestore no responde o falla, pasamos el error al middleware
    // global de index.js, que devuelve un 500 prolijo
    next(error);
  }
};
 
// GET /api/products/:id
export const getProductById = async (req, res, next) => {
  try {
    const product = await obtenerProductoPorId(req.params.id);
 
    if (!product) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
 
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
 
// POST /api/products/create
export const createProduct = async (req, res, next) => {
  try {
    // Validación simple: si no mandaron nombre, es un error 400 (bad request)
    if (!req.body.nombre) {
      return res.status(400).json({ mensaje: 'El campo "nombre" es obligatorio' });
    }
 
    const newProduct = await crearProducto(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
 
// DELETE /api/products/:id
export const deleteProduct = async (req, res, next) => {
  try {
    const deleted = await eliminarProducto(req.params.id);
 
    if (!deleted) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
 
    res.status(200).json({ mensaje: 'Producto eliminado exitosamente' });
  } catch (error) {
    next(error);
  }
};