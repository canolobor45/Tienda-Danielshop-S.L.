const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

// REQUISITO: Tres entidades con relación semántica y volátiles (Mapas)
const productos = new Map();
const categorias = new Map();
const vendedores = new Map();

// --- API REST: PRODUCTOS ---
app.get('/api/productos', (req, res) => res.json(Array.from(productos.values())));

app.post('/api/productos', (req, res) => {
    const { id, nombre, precio } = req.body;
    productos.set(id, { id, nombre, precio });
    res.status(201).json({ msg: "Producto creado en Danielshop" });
});

// REQUISITO: Operación PATCH (API REST)
app.patch('/api/productos/:id', (req, res) => {
    const id = req.params.id;
    if (productos.has(id)) {
        const actual = productos.get(id);
        const actualizado = { ...actual, ...req.body };
        productos.set(id, actualizado);
        res.json(actualizado);
    } else {
        res.status(404).send("No encontrado");
    }
});

app.delete('/api/productos/:id', (req, res) => {
    productos.delete(req.params.id);
    res.send("Eliminado");
});

// Nota: Deberás replicar estas rutas para 'categorias' y 'vendedores'
app.listen(3000, () => console.log("Servidor Danielshop-S.L. operativo en puerto 3000"));
