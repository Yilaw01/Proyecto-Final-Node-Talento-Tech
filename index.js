//Imports
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import productsRoutes from './rutas/products.rutas.js';
import authRoutes from './rutas/auth.rutas.js';
 
//variable de entornos
dotenv.config();
 
//Instancia de express
const app = express();
 
//Middlewares
app.use(cors());
app.use(bodyParser.json());
 
//Rutas
app.use('/api/products', productsRoutes);
app.use('/auth', authRoutes);
 
//Middleware manejo de errores
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});
 
app.use((err, req, res, next) => {
  console.error('Error no controlado:', err);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
});
 
//Puerto
const PORT = process.env.PORT || 3000;
 
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});