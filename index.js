//Imports
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import productsRoutes from './rutas/products.rutas.js';
import authRoutes from './rutas/auth.rutas.js';

// En ESModules no existe __dirname por defecto, hay que armarlo así
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
//variable de entornos
dotenv.config();
 
//Instancia de express
const app = express();
 
//Middlewares
app.use(cors());
app.use(bodyParser.json());

// Sirve public/index.html en GET / (solo visual, no interfiere con la API)
app.use(express.static(path.join(__dirname, 'public')));
 
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