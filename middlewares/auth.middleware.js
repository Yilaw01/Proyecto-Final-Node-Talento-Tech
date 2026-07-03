// Middleware que protege las rutas que requieren estar logueado.
// Se ejecuta ANTES del controlador, en las rutas donde lo agregamos
// (ver rutas/products.rutas.js: router.post("/", verifyToken, createProduct)).
//
// Lee el header "Authorization: Bearer <token>", lo valida contra el
// JWT_SECRET, y si es válido deja pasar la petición con next().

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Si no mandaron el header, o no tiene el formato "Bearer <token>",
  // no hay token -> 401 (no autenticado)
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'Token no provisto' });
  }

  // "Bearer abc123..." -> nos quedamos solo con "abc123..."
  const token = authHeader.split(' ')[1];

  try {
    // jwt.verify tira una excepción si el token es inválido o expiró
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Guardamos los datos del token por si el controlador los necesita
    req.usuario = payload;

    next();
  } catch (error) {
    // Token inválido o expirado -> 403 (prohibido, no autorizado a este recurso)
    return res.status(403).json({ mensaje: 'Token inválido o expirado' });
  }
}