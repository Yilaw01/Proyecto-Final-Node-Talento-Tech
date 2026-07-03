import { login } from '../servicios/auth.service.js';

// POST /auth/login
export const loginController = async (req, res, next) => {
  try {
    const { usuario, contrasena } = req.body;

    // Validacion: si falta algun campo, es un 400 (bad request)
    if (!usuario || !contrasena) {
      return res.status(400).json({ mensaje: 'Usuario y contraseña son obligatorios' });
    }

    const token = await login(usuario, contrasena);

    // Si las credenciales no coinciden, 401 (no autorizado)
    if (!token) {
      return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
    }

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  } 
}