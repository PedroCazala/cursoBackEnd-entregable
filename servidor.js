// import {getAllProducts}from'./products.js'
const {producto}= require('./products.js')
// const producto = new Contenedor()
// import {getAllProducts} from './products'

// const contenedor =require('products')
console.log(producto.getAll())

const express = require('express')
const app = express()
const PORT =8080
const server= app.listen(PORT,()=>{
    console.log(`Servidor Http  escuchando en el puerto ${server.address().port}`)
})
server.on('error', error =>{
    console.log(`Error en el servidor ${error}`)
})
app.get('/',(req, res)=>{
    res.send('hola')
})

app.get('/products',(req, res)=>{
    res.send(`Los productos obtenidos son: ${JSON.stringify(producto.getAll())}`)
})

app.get('/productsRandom',(req, res)=>{
    let numRandom = parseInt(Math.random() * (producto.quantityOfProducts() - 0) + 0);
    ( numRandom || numRandom === 0 )?
        res.send(`Producto Random obtenido: ${producto.getById(numRandom)}`)
    :
    res.send(`No hay productos en la lista`)
})