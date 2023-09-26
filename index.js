import { ProductManager } from './ProductManager.js';
import express from 'express';
const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/products', async(req, res) => {
    try {
        const p1 = new ProductManager('products.json');
        const products = await p1.getProducts();
        const { limit } = req.query;

        res.send(products.slice(0, limit));

    } catch (error) {
        res.send(error);
    }

});

app.get('/products/:id', async(req, res) => {
    try {
        const p1 = new ProductManager('products.json');
        const { id } = req.params;
        const product = await p1.getProductById(+id);
        if (product) {
            res.status(200).send(product);
        } else {
            res.status(404).json({
                error: 'Producto no encontrado',
                message: 'El producto buscado no existe'
            });
        }
    } catch (error) {
        res.send(error);
    }

})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});