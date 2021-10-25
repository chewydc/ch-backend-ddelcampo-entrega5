//-------------------------------------------------------------------
// Desafio Entregable N°4: API RESTfull
// Fecha de entrega tope: 01-10-21
// Alumno: Damian del Campo
//-------------------------------------------------------------------
const {Router} = require('express')
const routerProductos = new Router()

const MESSAGEERROR = 'Producto no encontrado';

const Contenedor = require ("./Contenedor");
a = new Contenedor("productos.txt")

async function listProd(req,res,next){
    req.data=(await a.getAll())
    next()
}

routerProductos.get('/',async (req,res)=> {
    res.json(await a.getAll());
})

routerProductos.get('/:id',async (req,res)=> {
    const { id } = req.params
    let b=await a.getById(id)
    if(b.length == 0) {b=MESSAGEERROR}
    res.json(b)
})

routerProductos.post('/',async (req,res)=> {
    const nuevoProducto = req.body
    console.log(`Nuevo producto ID: ${await a.save(nuevoProducto)} cargado OK!`)
    res.redirect('/productos');
})

routerProductos.put('/:id',async (req,res)=> {
    const { id } = req.params
    const nuevoProducto = req.body
    let productos=await a.getById(id)
    if(productos.length == 0) {res.json(MESSAGEERROR)}
    else {
        let productos=await a.getAll()
            await a.deleteAll()
            for (let i = 0; i < productos.length; i++) {
                if(productos[i].id==id) {productos[i]=nuevoProducto}
                await a.save(productos[i]);
            }
            res.json(await a.getAll())
        } 
})

routerProductos.delete('/:id',async (req,res)=> {
    const { id } = req.params
    let b=await a.getById(id)
    if(b.length == 0) {res.json(MESSAGEERROR)}
    else  {
        await a.deleteById(id)
        res.json(`Producto ID: ${id} eliminado OK!`)
    }
})

//exports.routerProductos = routerProductos;
module.exports={routerProductos,listProd}