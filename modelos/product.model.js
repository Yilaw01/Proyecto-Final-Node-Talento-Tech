//Firestore
// Los servicios (servicios/products.service.js)
// llaman a estas funciones en vez de usar Firestore directamente

import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  deleteDoc
} from "firebase/firestore";
import { db } from "../config/firebase.config.js";

// Referencia a la colección "productos" en Firestore
const productosCollection = collection(db, "productos");

// Trae todos los documentos de la colección "productos"
export const getAllProducts = async () => {
  const snapshot = await getDocs(productosCollection);

    // Cada doc de Firestore trae los datos separados del id, así que los
    // combinamos en un solo objeto: { id, nombre, precio, stock, ... }
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

// Busca un único producto por su id de documento
export const getProductById = async (id) => {
  const docRef = doc(db, "productos", id);
  const docSnap = await getDoc(docRef);
    // Si el documento no existe, devolvemos null (el servicio/controlador
    // decide qué hacer con eso, ej: responder 404)
  if (!docSnap.exists()) {
    return null;
  }
    return { id: docSnap.id, ...docSnap.data() }

}

// Crea un nuevo producto en Firestore. Firestore genera el id automáticamente.
export const createProduct = async (data) => {
  const docRef = await addDoc(productosCollection, data);
  return { id: docRef.id, ...data };
}

// Elimina un producto por id. Firestore no avisa si el documento no
// existía, así que primero comprobamos con getProductById.
export const deleteProduct = async (id) => {
  const product = await getProductById(id);
  if (!product) {
    return null;
  }
  const docRef = doc(db, "productos", id);
  await deleteDoc(docRef);
  return true;
}