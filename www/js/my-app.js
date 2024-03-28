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
    { path: '/detailsProduct/', url: 'detailsProduct.html', options: { transition: 'f7-cover' } },
    { path: '/insumos/', url: 'insumos.html', options: { transition: 'f7-cover' } },
    { path: '/manoObra/', url: 'manoObra.html', options: { transition: 'f7-cover' } },
  ]
  // ... other parameters
});

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
  console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
  $$("#btnPrueba").on('click',mostrarInsumos)

})

$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  $$("#toListProducts").on('click', toListProducts)
})

$$(document).on('page:init', '.page[data-name="products"]', function (e) {
  $$("#btnListProduct").on('click', verProductos)
  $$("#filtroNombre").on("input", filtrarNombre)
  $$("#ordenBy").on("change", orderBy)
})
$$(document).on('page:init', '.page[data-name="newProduct"]', function (e) {
  $$("#btnAddProducto").on('click', añadirProducto)
})

$$(document).on('page:init', '.page[data-name="vendors"]', function (e) {
})

$$(document).on('page:init', '.page[data-name="prices"]', function (e) {
})

$$(document).on('page:init', '.page[data-name="fliers"]', function (e) {
})

$$(document).on('page:init', '.page[data-name="detailsProduct"]', function (e) {
  $$("#detailsProductTitle").text(tituloProductoDetallado);
})
$$(document).on('page:init', '.page[data-name="insumos"]', function (e) {
  $$("#productTitle").text(tituloInsumos);

  //Cantidades
  $$("#cantLijas").text(cantLijas);
  $$("#cantPinceles").text(cantPinceles)
  $$("#cantRodillos").text(cantRodillos);
  $$("#cantPintura").text(cantPintura);
  $$("#cantCola").text(cantCola)
  $$("#cantSilastic").text(cantSilastic);
  $$("#cantVidrio").text(cantVidrio);
  $$("#cantDiluyente").text(cantDiluyente);
  $$("#cantMueble").text(cantMueble);
  $$("#cantFlete").text(cantFlete)
  $$("#cantLuz").text(cantLuz);
  //Precios
  $$("#precioUnLijas").text(precioUnLijas);
  $$("#precioUnPinceles").text(precioUnPinceles)
  $$("#precioUnRodillos").text(precioUnRodillos);
  $$("#precioUnPintura").text(precioUnPintura);
  $$("#precioUnCola").text(precioUnCola)
  $$("#precioUnSilastic").text(precioUnSilastic);
  $$("#precioUnVidrio").text(precioUnVidrio);
  $$("#precioUnDiluyente").text(precioUnDiluyente);
  $$("#precioUnMueble").text(precioUnMueble);
  $$("#precioUnFlete").text(precioUnFlete)
  $$("#precioUnLuz").text(precioUnLuz);
  //Precios totales
  $$("#precioTotalLijas").text(precioTotalLijas);
  $$("#precioTotalPinceles").text(precioTotalPinceles)
  $$("#precioTotalRodillos").text(precioTotalRodillos);
  $$("#precioTotalPintura").text(precioTotalPintura);
  $$("#precioTotalCola").text(precioTotalCola)
  $$("#precioTotalSilastic").text(precioTotalSilastic);
  $$("#precioTotalVidrio").text(precioTotalVidrio);
  $$("#precioTotalDiluyente").text(precioTotalDiluyente);
  $$("#precioTotalMueble").text(precioTotalMueble);
  $$("#precioTotalFlete").text(precioTotalFlete)
  $$("#precioTotalLuz").text(precioTotalLuz);

  //Costo total
  $$("#insumoCostoTotal").text(costoTotal)

})
$$(document).on('page:init', '.page[data-name="manoObra"]', function (e) {
})


/* -------------------------------- Variables db ------------------------------- */

db = firebase.firestore()
colProveedores = db.collection('PROVEEDORES')
colProductos = db.collection('PRODUCTOS')
colInsumos = db.collection('INSUMOS')
colManoDeObra = db.collection('MANODEOBRA')

/* --------------------------- Variables globales --------------------------- */
var products = []
var insumos = []
var tituloProductoDetallado, tituloInsumos, detalleLija, detallePincel, detalleRodillo, detallePintura, detalleCola, detalleSilastic, detalleVidrio, detalleDiluyente, detalleMueble, detalleFlete, detalleLuz, detalleHsProducto
var cantLijas, cantPinceles, cantRodillos, cantPintura, cantCola, cantSilastic, cantVidrio, cantDiluyente, cantMueble, cantFlete, cantLuz
var precioUnLijas, precioUnPinceles, precioUnRodillos, precioUnPintura, precioUnCola, precioUnSilastic, precioUnVidrio, precioUnDiluyente, precioUnMueble, precioUnFlete, precioUnLuz
var precioTotalLijas, precioTotalPinceles, precioTotalRodillos, precioTotalPintura, precioTotalCola, precioTotalSilastic, precioTotalVidrio, precioTotalDiluyente, precioTotalMueble, precioTotalFlete, precioTotalLuz
var variableOrdenamiento = "Proveedor"
var valorOrdenamiento = "asc"
var variableQuery = "Proveedor"
var operadorQuery = "!="
var valorQuery = "-"

/* -------------------------------- Funciones ------------------------------- */

//Función para añadir productos a db
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
    Costo: 0,
    PrecioFinal: 0,
    Proveedor: proveedor
  }

  if (proveedor == "-") {
    app.dialog.alert("Ingrese el Proveedor!")
  } else {
    colProductos.add(producto)
      .then(function (doc) {
        console.log("Producto agregado");

      })
      .catch(function (err) {
        console.log("Error al agregar producto")
      })
  }
}


//Función para ver lista de productos
function verProductos() {

  
  colProductos.orderBy(variableOrdenamiento, valorOrdenamiento).where(variableQuery, operadorQuery, valorQuery).get()
    .then(function (res) {
      res.forEach(function (doc) {
        info = doc.data()
        products.push(info);
      });

      // Iterar sobre el array
      for (i = 0; i < products.length; i++) {
        
        // Crear nueva fila
        var nuevaFila = $$('<tr>');

        // Crear celda para el valor
        var celdaNombre = $$('<td>').text(`${products[i].Nombre}-${products[i].Tipo}`);
        var celdaColor = $$('<td>').text(products[i].Color);
        var celdaPrecio = $$('<td>').text(products[i].PrecioFinal);
        var celdaMedida = $$('<td>').text(`${products[i].Ancho}x${products[i].Largo}x${products[i].Ancho}`);
        var celdaStock = $$('<td>').text(products[i].Stock);
        var celdaProveedor = $$('<td>').text(products[i].Proveedor);
        
          btnDetalles = $$(`<input id="${i}" type="button" value="+" class="button button-small button-round button-fill color-green">`)
          btnDetalles.data("valorId", `${i}`)
          btnDetalles.on("click", function () {
            var dataId = $$(this).data("valorId")

            tituloProductoDetallado = `${products[dataId].Nombre}-${products[dataId].Tipo}`
            tituloInsumos = `${products[dataId].Nombre}-${products[dataId].Tipo}`

            // Crear celda para el valor
           cantLijas = `${products[dataId].Lijas}`
           cantPinceles = `${products[dataId].Pinceles}`
           cantRodillos = `${products[dataId].Rodillos}`
           cantPintura = `${products[dataId].Pintura}`
           cantCola = `${products[dataId].Cola}`
           cantSilastic = `${products[dataId].Silastic}`
           cantVidrio = `${products[dataId].Vidrios}`
           cantDiluyente = `${products[dataId].Diluyente}`
           cantMueble = `${products[dataId].Mueble}`
           cantFlete = `${products[dataId].Flete}`
           cantLuz = `${products[dataId].Luz}`
           
           console.log(products);
           
           console.log(cantLijas, cantPinceles, cantRodillos, cantPintura, cantCola, cantSilastic, cantVidrio, cantDiluyente, cantMueble, cantFlete, cantLuz);

           //Función para mostrar precios
           mostrarInsumos()
           
           // Agregar celdas a la fila
           mainView.router.navigate("/detailsProduct/")

          })

        
        var celdaDetalles = $$('<td>').append(btnDetalles);

        // Agregar celdas a la fila
        nuevaFila.append(celdaNombre, celdaColor, celdaPrecio, celdaMedida, celdaStock, celdaProveedor, celdaDetalles);

        // Agregar fila al cuerpo de la tabla
        $$("#tableProducts").append(nuevaFila);

      }


      $$("#btnListProduct").removeClass("btnVisible").addClass("btnOculto")
      $$("#cajaFiltroNombre").removeClass("btnOculto").addClass("btnVisible")
      $$("#cajaOrdenar").removeClass("btnOculto").addClass("btnVisible")
    })
    .catch(function (err) {
      console.log("Error al listar productos")
    })
}


function toListProducts() {
  products = []
}

//Función para filtrar lista por nombre
function filtrarNombre() {
  products = []
  $$("#tableProducts").html("")
  nombreElegido = $$("#filtroNombre").val().toLowerCase()

  nombreModificado = nombreElegido.charAt(0).toUpperCase() + nombreElegido.slice(1).toLowerCase()

  if (nombreModificado.length !== 0) {
    variableOrdenamiento = "Nombre"
    valorOrdenamiento = "asc"
    variableQuery = "Nombre"
    valorQuery = nombreModificado
    operadorQuery = "=="
    verProductos()
  }else if(nombreModificado.length == 0){
    variableOrdenamiento = "Proveedor"
    valorOrdenamiento = "asc"
    variableQuery = "Proveedor"
    operadorQuery = "!="
    valorQuery = "-"
    verProductos()
  }
}

//Función para ordenar lista
function orderBy(){
  
  $$("#tableProducts").html("")
  products = []
  orderValue = $$("#ordenBy").val()

  if (orderValue == "PrecioMenMay") {
    variableOrdenamiento = "PrecioFinal"
    valorOrdenamiento = "asc"
    variableQuery = "PrecioFinal"
    operadorQuery = "!="
    valorQuery = "-"
  }else if (orderValue == "PrecioMayMen") {
    variableOrdenamiento = "PrecioFinal"
    valorOrdenamiento = "desc"
    variableQuery = "PrecioFinal"
    operadorQuery = "!="
    valorQuery = "-"
  }else if (orderValue == "Proveedor"){
    variableOrdenamiento = "Proveedor"
    valorOrdenamiento = "asc"
    variableQuery = "Proveedor"
    operadorQuery = "!="
    valorQuery = "-"
  }

  verProductos()
}

//Función para mostrar precios de insumos
function mostrarInsumos() {

  insumos = []

  insumo = {
    nombre: "Luz",
    precio: 100,
    stock: 10
  }

    colInsumos.orderBy("nombre").get()
      .then(function (res) {
        res.forEach(function (doc){
          
          info = doc.data()
          
          insumos.push(info.precio)

          
          
        })
        console.log(insumos);
        
        //Precios de insumos
        precioUnCola = `${insumos[0]}`
        precioUnDiluyente = `${insumos[1]}`
        precioUnFlete = `${insumos[2]}`
        precioUnLijas = `${insumos[3]}`
        precioUnLuz = `${insumos[4]}`
        precioUnMueble = `${insumos[5]}`
        precioUnPinceles = `${insumos[6]}`
        precioUnPintura = `${insumos[7]}`
        precioUnRodillos = `${insumos[8]}`
        precioUnSilastic = `${insumos[9]}`
        precioUnVidrio = `${insumos[10]}`
        //Precios de insumos
        precioTotalCola = (precioUnCola * cantCola)
        precioTotalDiluyente = (precioUnDiluyente * cantDiluyente)
        precioTotalFlete = (precioUnFlete *  cantFlete)
        precioTotalLijas = (precioUnLijas * cantLijas)
        precioTotalLuz = (precioUnLuz * cantLuz)
        precioTotalMueble = (precioUnMueble * cantMueble)
        precioTotalPinceles = (precioUnPinceles * cantPinceles)
        precioTotalPintura = (precioUnPintura * cantPintura)
        precioTotalRodillos = (precioUnRodillos * cantRodillos)
        precioTotalSilastic = (precioUnSilastic * cantSilastic)
        precioTotalVidrio = (precioUnVidrio * cantVidrio)

        //Calculo de costo total
        costoTotal = (precioUnLijas * cantLijas) + (precioUnPinceles * cantPinceles) + (precioUnRodillos * cantRodillos) + (precioUnPintura * cantPintura) + (precioUnCola * cantCola) + (precioUnSilastic * cantSilastic) + (precioUnVidrio * cantVidrio) + (precioUnDiluyente * cantDiluyente) + (precioUnMueble * cantMueble) + (precioUnFlete *  cantFlete) + (precioUnLuz * cantLuz)

        })

      
      .catch(function (err) {
        console.log("Error")
      })

}