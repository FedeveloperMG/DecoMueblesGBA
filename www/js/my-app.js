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
    { path: '/preciosInsumos/', url: 'preciosInsumos.html', options: { transition: 'f7-cover' } },
    { path: '/preciosManoObra/', url: 'preciosManoObra.html', options: { transition: 'f7-cover' } },
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
  actualizarProveedores()
})

$$(document).on('page:init', '.page[data-name="prices"]', function (e) {
  pricesInsumos()
  pricesMO()
  $$("#toListInsumos").on('click', toListPreciosIn)
})

$$(document).on('page:init', '.page[data-name="fliers"]', function (e) {
})

$$(document).on('page:init', '.page[data-name="detailsProduct"]', function (e) {
  $$("#detailsProductTitle").text(tituloProductoDetallado);

})

$$(document).on('page:init', '.page[data-name="insumos"]', function (e) {
  $$("#productTitle").text(tituloProductoDetallado);

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
  $$("#productManoDeObraTitle").text(tituloProductoDetallado);
  //Cantidades
  $$("#CantHorasMO").text(cantHsTrabajo)
  //Precios
  $$("#precioHoraMO").text(precioHora)
  //Costo total
  $$("#mOCostoTotal").text(costoTotalMO)
})
$$(document).on('page:init', '.page[data-name="preciosInsumos"]', function (e) {
  //Mostrar precios Insumos
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

  actualizarPreciosInsumos()
  $$("#btnActualTodosIn").on("click", actualizarTodosLosInsumos)


})
$$(document).on('page:init', '.page[data-name="preciosManoObra"]', function (e) {
  //Mostrar precios MO
  $$("#precioHoraMOOficial").text(precioHoraMOOficial)
  $$("#precioHoraMOAyudante").text(precioHoraMOAyudante)

  //Eventos
  $$("#btnActualOficial").on("click", actualizarPreciosMOOf)
  $$("#btnActualAyudante").on("click", actualizarPreciosMOAy)
  $$("#btnActualTodosMO").on("click", actualizarTodosPreciosMO)
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
var cantLijas, cantPinceles, cantRodillos, cantPintura, cantCola, cantSilastic, cantVidrio, cantDiluyente, cantMueble, cantFlete, cantLuz, cantHsTrabajo
var precioUnLijas, precioUnPinceles, precioUnRodillos, precioUnPintura, precioUnCola, precioUnSilastic, precioUnVidrio, precioUnDiluyente, precioUnMueble, precioUnFlete, precioUnLuz, costoTotal, costoTotalMO
var precioTotalLijas, precioTotalPinceles, precioTotalRodillos, precioTotalPintura, precioTotalCola, precioTotalSilastic, precioTotalVidrio, precioTotalDiluyente, precioTotalMueble, precioTotalFlete, precioTotalLuz, precioHora, precioHoraMOOficial, precioHoraMOAyudante
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
      products = []
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
          mostrarMObra()
          
          
          //Variables del producto seleccionado
          precioUnMueble = products[dataId].PrecioMueble
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
          cantHsTrabajo = `${products[dataId].Hstrabajo}`


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
      $$("#cajaTablaProductos").removeClass("elementoOculto").addClass("elementoVisible")
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
  } else if (nombreModificado.length == 0) {
    variableOrdenamiento = "Proveedor"
    valorOrdenamiento = "asc"
    variableQuery = "Proveedor"
    operadorQuery = "!="
    valorQuery = "-"
    verProductos()
  }
}

//Función para ordenar lista
function orderBy() {

  $$("#tableProducts").html("")
  products = []
  orderValue = $$("#ordenBy").val()

  if (orderValue == "PrecioMenMay") {
    variableOrdenamiento = "PrecioFinal"
    valorOrdenamiento = "asc"
    variableQuery = "PrecioFinal"
    operadorQuery = "!="
    valorQuery = "-"
  } else if (orderValue == "PrecioMayMen") {
    variableOrdenamiento = "PrecioFinal"
    valorOrdenamiento = "desc"
    variableQuery = "PrecioFinal"
    operadorQuery = "!="
    valorQuery = "-"
  } else if (orderValue == "Proveedor") {
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

  colInsumos.orderBy("nombre").get()
    .then(function (res) {
      res.forEach(function (doc) {
        info = doc.data()
        insumos.push(info.precio)
      })

      //Precios de insumos
      precioUnCola = `${insumos[0]}`
      precioUnDiluyente = `${insumos[1]}`
      precioUnFlete = `${insumos[2]}`
      precioUnLijas = `${insumos[3]}`
      precioUnLuz = `${insumos[4]}`
      precioUnPinceles = `${insumos[5]}`
      precioUnPintura = `${insumos[6]}`
      precioUnRodillos = `${insumos[7]}`
      precioUnSilastic = `${insumos[8]}`
      precioUnVidrio = `${insumos[9]}`

      //Precios de insumos
      precioTotalCola = (precioUnCola * cantCola)
      precioTotalDiluyente = (precioUnDiluyente * cantDiluyente)
      precioTotalFlete = (precioUnFlete * cantFlete)
      precioTotalLijas = (precioUnLijas * cantLijas)
      precioTotalLuz = (precioUnLuz * cantLuz)
      precioTotalMueble = (precioUnMueble * cantMueble)
      precioTotalPinceles = (precioUnPinceles * cantPinceles)
      precioTotalPintura = (precioUnPintura * cantPintura)
      precioTotalRodillos = (precioUnRodillos * cantRodillos)
      precioTotalSilastic = (precioUnSilastic * cantSilastic)
      precioTotalVidrio = (precioUnVidrio * cantVidrio)

      //Calculo de costo total
      costoTotal = (precioUnLijas * cantLijas) + (precioUnPinceles * cantPinceles) + (precioUnRodillos * cantRodillos) + (precioUnPintura * cantPintura) + (precioUnCola * cantCola) + (precioUnSilastic * cantSilastic) + (precioUnVidrio * cantVidrio) + (precioUnDiluyente * cantDiluyente) + (precioUnMueble * cantMueble) + (precioUnFlete * cantFlete) + (precioUnLuz * cantLuz)
    })


    .catch(function (err) {
      console.log("Error")
    })

}

function mostrarMObra() {
  colManoDeObra.get()
    .then(function (res) {
      valoresH = []

      res.forEach(function (doc) {
        datos = doc.data();

        valoresH.push(datos.valorH)

        precioHora = datos.valorHOF
      })
      
      precioHora = parseInt(valoresH[0] + valoresH[1])
      costoTotalMO = precioHora * cantHsTrabajo


    })
    .catch(function (err) {
      console.log(err)

    })
}

//Funcion para ver precios Mano de obra
function pricesMO() {
  colManoDeObra.get()
    .then(function (res) {
      valores = []
      res.forEach(function (doc) {
        info = doc.data()

        valores.push(info.valorH)

      }
      )
      console.log(valores);
      precioHoraMOAyudante = valores[0]
      precioHoraMOOficial = valores[1]
    })
    .catch(function (err) { console.log(err) })
}

//Función para actulizar precios de MO
function actualizarPreciosMOOf(porcent) {
  porcentajeActualizacionOf = $$("#porcentActualOficial").val()
  porcent = porcentajeActualizacionOf

  precioActualizadoOf = parseInt(precioHoraMOOficial * (1 + (porcent / 100)))

  colManoDeObra.doc("valorHOF").set({ valorH: precioActualizadoOf })
    .then(function () {
      $$("#precioActualizadoOficial").text(precioActualizadoOf)
      console.log("Actualizado correctamente");

      texto = `<h3>Actualizando precio...</h3> <h5>Nuevo valor: $${precioActualizadoOf}</h5>`
      loader(texto)
    })
    .catch(function (err) {
      console.log(err);
    });
}

//Función para actulizar precios de MO
function actualizarPreciosMOAy(porcent) {
  porcentajeActualizacionAy = $$("#porcentActualAyudante").val()
  porcent = porcentajeActualizacionAy

  precioActualizadoAy = parseInt(precioHoraMOAyudante * (1 + (porcent / 100)))

  colManoDeObra.doc("valorHAY").set({ valorH: precioActualizadoAy })
    .then(function () {
      $$("#precioActualizadoAyudante").text(precioActualizadoAy)
      console.log("Actualizado correctamente");

      texto = `<h3>Actualizando precio...</h3> <h5>Nuevo valor: $${precioActualizadoAy}</h5>`
      loader(texto)
    })
    .catch(function (err) {
      console.log(err);
    });

}

//Función para actualizar todos los precios
function actualizarTodosPreciosMO() {
  porcentajeTodos = $$("#porcentActualTodosMO").val()

  precioActualizadoOf = parseInt(precioHoraMOOficial * (1 + (porcentajeTodos / 100)))
  precioActualizadoAy = parseInt(precioHoraMOAyudante * (1 + (porcentajeTodos / 100)))

  colManoDeObra.doc("valorHAY").update({ valorH: precioActualizadoAy })
    .then(function () {
      console.log("Precio Ayudante actualizado correctamente");
    })
    .catch(function (err) {
      console.log(err);
    });
  colManoDeObra.doc("valorHOF").update({ valorH: precioActualizadoOf })
    .then(function () {
      console.log("Precio Oficial actualizado correctamente");
    })
    .catch(function (err) {
      console.log(err);
    });

  texto = `<h3>Actualizando precios...</h3>`
  loader(texto)

}

//Función para espera de carga de datos
function toListPreciosIn (){
  setTimeout(function(){
    mainView.router.navigate('/preciosInsumos/')
},1000)
}

//Función loader para actualización
function loader(texto) {

  app.dialog.preloader(texto);

  setTimeout(function () {
    app.dialog.close();
    //Se pasa a la pantalla de confirmación del turno
    mainView.router.navigate('/prices/')
  }, 4000);
}

//Funcion para ver precios de insumos
var preciosInsumos
function pricesInsumos() {

  colInsumos.orderBy("nombre").get()
    .then(function (res) {
      preciosInsumos = []

      res.forEach(function (doc) {

        info = doc.data()

        preciosInsumos.push(info.precio)

      })
      //Precios de insumos
      precioUnCola = `${preciosInsumos[0]}`
      precioUnDiluyente = `${preciosInsumos[1]}`
      precioUnFlete = `${preciosInsumos[2]}`
      precioUnLijas = `${preciosInsumos[3]}`
      precioUnLuz = `${preciosInsumos[4]}`
      precioUnPinceles = `${preciosInsumos[5]}`
      precioUnPintura = `${preciosInsumos[6]}`
      precioUnRodillos = `${preciosInsumos[7]}`
      precioUnSilastic = `${preciosInsumos[8]}`
      precioUnVidrio = `${preciosInsumos[9]}`

      console.log(preciosInsumos);
    })
    .catch(function (err) { console.log(err); })
}

//Función para actualizar precios de insumos
function actualizarPreciosInsumos() {

  botones = document.querySelectorAll('.boton');
  inputs = document.querySelectorAll('.porcentaje');
  precios = document.querySelectorAll('.precios');

  botones.forEach(function (boton, index) {
    boton.addEventListener('click', function () {
      valorPorcentaje = parseInt(inputs[index].value);

      resultado = parseInt(preciosInsumos[index] * (1 + (valorPorcentaje / 100)))

      colInsumos.orderBy("nombre").get()
        .then(function (res) {
          nombres = []
          ids = []
          res.forEach(function (doc) {
            info = doc.data()
            ids.push(doc.id);
            nombres.push(info.nombre)
          })

          insumoActualizado = nombres[index]

          valorId = ids[index]

          colInsumos.doc(valorId).update({ precio: resultado })
            .then(function (res) {
              console.log(`Valor de ${insumoActualizado} actualizado correctamente`);
              texto = `<h3>Actualizando precio...</h3> <h5>Nuevo valor: $${resultado}</h5>`
              loader(texto)
            })
            .catch(function (err) { console.log(err); })
        })
          .catch(function (err) { console.log(err); })

    });
  });
}

//Actualizar todos los precios de insumos
function actualizarTodosLosInsumos (){

  porcentaje = $$("#porcentActualTodosIn").val()

  colInsumos.orderBy("nombre").get()
    .then(function(res){
      precios = []
      ids = []
      res.forEach(function(doc){
        info = doc.data()
        id = doc.id
        precio = info.precio

        //Operación
        resultado = parseInt(precio * (1 + (porcentaje / 100)))

        ids.push(id)
        precios.push(resultado)

      })

      for (i = 0; i < ids.length; i++) {
        colInsumos.doc(ids[i]).update({ precio: precios[i]})
          .then(function(res){
            console.log("Todos los precios actualizados correctamente");
            texto = `<h3>Actualizando precios...</h3>`
            loader(texto)
          })
          .catch(function(err){console.log(err);})
      }

    })
    .catch(function(err){console.log(err);})
}

//Ver y actualizar proveedores
function actualizarProveedores (){

  botones = document.querySelectorAll('.botonActProv');
  inputs = document.querySelectorAll('.porcentajeProv');

  botones.forEach(function (boton, index) {
    boton.addEventListener('click', function () {

      console.log(boton.id, index, inputs[index].value);
      

      colProductos.where("Proveedor","==",boton.id).get()
        .then(function (res) {
          preciosProveedores = []
          res.forEach(function (doc) {
            info = doc.data()
            id = doc.id
            preciosProveedores.push({id: id, price: info.PrecioMueble})
          })
          
          console.log(preciosProveedores);
          for (i = 0; i < preciosProveedores.length; i++) {
            valor = preciosProveedores[i].price
            porcentajeDeActual = inputs[index].value

            precioActualizado = parseInt(valor * (1 + (porcentajeDeActual / 100)))

            console.log(precioActualizado);
             
            
            colProductos.doc(preciosProveedores[i].id).update({PrecioMueble: precioActualizado})
              .then(function (res) {
                console.log("Precio actualizado correctamente")
              })
              .catch(function (err) { console.log(err); })
              
            }

        })
        .catch(function (err) { console.log(err); })
      })})

}

