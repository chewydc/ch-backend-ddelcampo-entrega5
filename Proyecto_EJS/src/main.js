//-------------------------------------------------------------------
// Desafio Entregable N°5: Motores de Plantillas
// Fecha de entrega tope: 08-10-21
// Alumno: Damian del Campo
//-------------------------------------------------------------------
const express = require('express')
const app = express()

const {routerProductos,listProd} = require("./router/productos")
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.use('/api/productos',routerProductos)

app.set('views', './views');
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('inicio');
});

app.get("/productos",listProd, (req, res) => {
  if(req.data.length==0) res.render('listado', {productos: req.data, hayProducto: false});
  else res.render("listado", {productos: req.data, hayProducto: true}); 
});

//-------------------------------------------------------------------
// Cargo el server
const PORT =  8080
const server = app.listen(PORT, () => {
console.info(`Servidor HTTP escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

