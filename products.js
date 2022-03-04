const fs =require('fs')
const ruta = './products.txt'
let array2
const actualizar = ()=>{
    try{
        array2 = fs.readFileSync(ruta,'utf-8')
        array2 = JSON.parse(array2)
    }catch{
        fs.writeFileSync(ruta,'[]')
    }
}
actualizar()

class Contenedor {
    save(product){
        actualizar()
        let arrayDeIds = array2
            .map(prod =>prod.id)
            .sort((a,b)=>a-b)
        let idGenerado;
        for(let i = 0 ;i<=(arrayDeIds.length);i++){
            let idExistente = arrayDeIds.find(element => i === element)
            console.log('i= ',i);
            if(!idExistente){
                idGenerado = i
                console.log('entro', idGenerado)
            }
        }
        // let idGenerado =arrayDeIds ?(arrayDeIds.length +1): 1

        try{
            let salvar=[...array2, {id:idGenerado,...product}]
            let arrayString =JSON.stringify(salvar)
            fs.writeFileSync(ruta,arrayString)
            actualizar()
        }catch(err){
            console.log(err.name)
        }
    }
    getById(idNumero){
        let productoEncontrado = array2.find(element => element.id == idNumero)
        if(productoEncontrado){
            return `El producto que coincide con ese id es ${productoEncontrado.nombre}`
        }else{
            console.log(`No existe un producto que coincida con ese id`);
        }
    }
    getAll(){
        actualizar()
        const data = array2
        return data
    }
    deleteById(idNumero){
        actualizar()
        let productoEncontrado = array2.find(element => element.id == idNumero)
        if(productoEncontrado){
            let nuevoArray = array2.filter(producto=>producto.id !== idNumero)
            try{
                fs.writeFileSync(ruta,JSON.stringify(nuevoArray))
                actualizar()
            }
            catch(err){
                console.log(err)
            }
        }else{
            console.log(`No existe un producto que coincida con el id: ${idNumero}`);
        }
    }
    delateAll(){
        try {
            fs.unlinkSync(ruta)
        } catch (error) {
            console.log(error.name, error.message)
        }
    }
    quantityOfProducts(){
        actualizar()
        return array2.length
    }
}
const producto = new Contenedor()

//AGREGAR PRODUCTOS
    // let product ={nombre:'papa', foto:'./papa', price:65.20}
    // producto.save(product)
    // let product2 ={nombre:'kiwi', foto:'./kiwi', price:33.65}
    // producto.save(product2)
    // let product3 ={nombre:'naranja', foto:'./naranja', price:156.4}
    // producto.save(product3)

//ENCONTAR PRODUCTIS POR ID
    // console.log(producto.getById(5))
    // console.log(producto.getById(1))
    // console.log(producto.getById(3))

//TRAER TODOS
    // console.log(producto.getAll())

//Mejorar:
    // producto.deleteById(1)
    // producto.deleteById(4)
    // producto.deleteById(9)

//BORRAR TODO EL ARCHIVO
    // producto.delateAll()


// console.log(array2);
// let arrayDeIds = array2
//             .map(prod =>prod.id)
//             .sort((a,b)=>a-b)
// console.log(arrayDeIds);

// module.exports = {getAllProducts}

module.exports = {producto}
// getAllProducts()
// export default producto