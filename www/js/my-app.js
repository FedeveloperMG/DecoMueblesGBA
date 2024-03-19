// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'DecoMuebles',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      { path: '/index/', url: 'index.html', options: { transition: 'f7-cover' } },
      { path: '/products/', url: 'products.html', options: { transition: 'f7-cover' } },
      { path: '/vendors/', url: 'vendors.html', options: { transition: 'f7-cover' } },
      { path: '/prices/', url: 'prices.html', options: { transition: 'f7-cover' } },
      { path: '/fliers/', url: 'fliers.html', options: { transition: 'f7-cover' } },
      { path: '/newProduct/', url: 'newProduct.html', options: { transition: 'f7-cover' } },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    
})

$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  $$("#toListProducts").on('click', toListProducts)
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="products"]', function (e) {
  $$("#btnListProduct").on('click', verProductos)
  $$("#filtroProveedor").on("change", filtrarProv)
  $$("#filtroNombre").on("change", filtrarNombre)
})
$$(document).on('page:init', '.page[data-name="newProduct"]', function (e) {
  $$("#btnAddProducto").on('click', añadirProducto)
})
// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="vendors"]', function (e) {
})
// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="prices"]', function (e) {
})
// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="fliers"]', function (e) {
})


/* -------------------------------- Variables db ------------------------------- */

db = firebase.firestore()
colProveedores = db.collection('PROVEEDORES')
colProductos = db.collection('PRODUCTOS')
colInsumos = db.collection('INSUMOS')
colManoDeObra = db.collection('MANODEOBRA')

/* --------------------------- Variables globales --------------------------- */
var products = []



/* -------------------------------- Funciones ------------------------------- */
function añadirProducto() {

  //Inputs
  nombre = $$("#newPNombre").val()
  tipo = $$("#newPTipo").val()
  color = $$("#newPColor").val()
  ancho = $$("#newPAncho").val()
  alto = $$("#newPAlto").val()
  largo = $$("#newPLargo").val()
  stock = $$("#newPStock").val()
  vidrios = $$("#newPVidrios").val()
  hsTrabajo = $$("#newPHsTrabajo").val()
  lijas = $$("#newPLijas").val()
  pinceles = $$("#newPPinceles").val()
  rodillos = $$("#newPRodillos").val()
  luz = $$("#newPLuz").val()
  pintura = $$("#newPPintura").val()
  cola = $$("#newPCola").val()
  silastic = $$("#newPSilastic").val()
  diluyente = $$("#newPDiluyente").val()
  flete = $$("#newPFlete").val()
  mueble = $$("#newPMueble").val()
  proveedor = $$("#newPProveedor").val()

  producto = 
  {
    Nombre: nombre,
    Tipo: tipo,
    Color: color,
    Ancho: ancho,
    Alto: alto,
    Largo: largo,
    Stock: stock,
    Vidrios: vidrios,
    Hstrabajo: hsTrabajo,
    Lijas: lijas,
    Pinceles: pinceles,
    Rodillos: rodillos,
    Luz: luz,
    Pintura: pintura,
    Cola: cola,
    Silastic: silastic,
    Diluyente: diluyente,
    Flete: flete,
    Mueble: mueble,
    Costo: 0 ,
    PrecioFinal: 0,
    Proveedor: proveedor
  }

  if(proveedor == "-"){
    app.dialog.alert("Ingrese el Proveedor!")
  }else{ 
    colProductos.add(producto)
    .then(function(doc){
      console.log("Producto agregado");
      
    })
    .catch(function(err){
      console.log("Error al agregar producto")
    })
  }
}


function verProductos() {

    colProductos.get()
    .then(function(res){
      res.forEach(function (doc){
        info = doc.data()
        
        console.log(info);

        products.push(info);

        console.log(products);
      });

        // Iterar sobre el array
        products.forEach(function(valor) {
          // Crear nueva fila
          var nuevaFila = $$('<tr>');
          
          // Crear celda para el valor
          var celdaNombre = $$('<td>').text(`${valor.Nombre}-${valor.Tipo}`);
          var celdaColor = $$('<td>').text(valor.Color);
          var celdaPrecio = $$('<td>').text(valor.PrecioFinal);
          var celdaMedida = $$('<td>').text(`${valor.Ancho}x${valor.Largo}x${valor.Ancho}`);
          var celdaStock = $$('<td>').text(valor.Stock);
          var celdaProveedor = $$('<td>').text(valor.Proveedor);
          
          // Agregar celdas a la fila
          nuevaFila.append(celdaNombre, celdaColor, celdaPrecio, celdaMedida, celdaStock, celdaProveedor);
          
          // Agregar fila al cuerpo de la tabla
          $$("#tableProducts").append(nuevaFila);

          $$("#btnListProduct").removeClass("btnVisible").addClass("btnOculto")     
          $$("#cajaFiltroProv").removeClass("btnOculto").addClass("btnVisible")     
          $$("#cajaFiltroNombre").removeClass("btnOculto").addClass("btnVisible")     
        });
  })
    .catch(function(err){
      console.log("Error al listar productos")
  })  
}

function toListProducts (){
  products = []
}

function filtrarProv (){

  products = []
  $$("#tableProducts").html("")


  proveedorElegido = $$("#filtroProveedor").val()

  colProductos.where("Proveedor", "==", proveedorElegido).get()
  .then(function(res){
    res.forEach(function (doc){
      info = doc.data()
      
      console.log(info);

      products.push(info);

      console.log(products);
    });

     // Iterar sobre el array
     products.forEach(function(valor) {
      // Crear nueva fila
      var nuevaFila = $$('<tr>');
      
      // Crear celda para el valor
      var celdaNombre = $$('<td>').text(`${valor.Nombre}-${valor.Tipo}`);
      var celdaColor = $$('<td>').text(valor.Color);
      var celdaPrecio = $$('<td>').text(valor.PrecioFinal);
      var celdaMedida = $$('<td>').text(`${valor.Ancho}x${valor.Largo}x${valor.Ancho}`);
      var celdaStock = $$('<td>').text(valor.Stock);
      var celdaProveedor = $$('<td>').text(valor.Proveedor);
      
      // Agregar celdas a la fila
      nuevaFila.append(celdaNombre, celdaColor, celdaPrecio, celdaMedida, celdaStock, celdaProveedor);
      
      // Agregar fila al cuerpo de la tabla
      $$("#tableProducts").append(nuevaFila);
      products = []
  })

}
)}


function filtrarNombre (){

  products = []
  $$("#tableProducts").html("")


  nombreElegido = $$("#filtroNombre").val()

  colProductos.where("Nombre", "==", nombreElegido).get()
  .then(function(res){
    res.forEach(function (doc){
      info = doc.data()
      
      console.log(info);

      products.push(info);

      console.log(products);
    });

     // Iterar sobre el array
     products.forEach(function(valor) {
      // Crear nueva fila
      var nuevaFila = $$('<tr>');
      
      // Crear celda para el valor
      var celdaNombre = $$('<td>').text(`${valor.Nombre}-${valor.Tipo}`);
      var celdaColor = $$('<td>').text(valor.Color);
      var celdaPrecio = $$('<td>').text(valor.PrecioFinal);
      var celdaMedida = $$('<td>').text(`${valor.Ancho}x${valor.Largo}x${valor.Ancho}`);
      var celdaStock = $$('<td>').text(valor.Stock);
      var celdaProveedor = $$('<td>').text(valor.Proveedor);
      
      // Agregar celdas a la fila
      nuevaFila.append(celdaNombre, celdaColor, celdaPrecio, celdaMedida, celdaStock, celdaProveedor);
      
      // Agregar fila al cuerpo de la tabla
      $$("#tableProducts").append(nuevaFila);
      products = []
  })

}
)}