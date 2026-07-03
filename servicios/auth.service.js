/*****************************
 * Req #7: lógica de autenticación. No hay colección de usuarios
 * en Firestore — el sistema tiene un único usuario admin definido por
 * variables de entorno (ADMIN_USER / ADMIN_PASS). Este servicio valida
 * esas credenciales, y si son correctas firma un JWT.
 * *****************************/

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Recibe usuario y contraseña, y devuelve el token si son correctos,
// o null si las credenciales no coinciden.
export const login = async (usuario, contrasena) => {
  const usuarioValido = usuario === process.env.ADMIN_USER;
  const contrasenaValida = contrasena === process.env.ADMIN_PASS;

  if (!usuarioValido || !contrasenaValida) {
    return null;
  }

  // Firmar el JWT
  const token = jwt.sign(
    { usuario: process.env.ADMIN_USER },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return token;
};