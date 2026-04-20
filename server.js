const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Producto = require('./models/Producto');
const Categoria = require('./models/Categoria');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Conexión a Base de Datos (Parte II)
mongoose.connect('mongodb://localhost:27017/danielshop');

// Seguridad (Parte III)
const SECRET = "DANIELSHOP_2026";

// Rutas de la API (Parte I)
app.get('/api/productos', async (req, res) => {
    const prods = await Producto.find().populate('categoria');
    res.json(prods);
});

app.post('/api/productos', async (req, res) => {
    const nuevo = new Producto(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
});

// Operación PATCH obligatoria (Parte I y II) [cite: 44, 46]
app.patch('/api/productos/:id', async (req, res) => {
    const actualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
});

app.delete('/api/productos/:id', async (req, res) => {
    await Producto.findByIdAndDelete(req.params.id);
    res.send("Eliminado");
});

app.listen(3000, () => console.log("Servidor Danielshop-S.L. activo"));
