import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic"; // importo las funciones de soquetic ( suscribe get event devuelve datos, susctibe post event los recibe)
import fs from "fs"; // importo los arhcivos

subscribeGETEvent ("obras", hola) // cuando el front end pida el evento obras ejecuto la funcion hola

function hola() {  
    let contenido = fs.readFileSync("../data/obras.json","utf-8");
    return JSON.parse(contenido);// data obras json es el archivo que leemos y utf-8 es para leerlo en texto y no en binario. let creaa variables.
} // resumen: el front end le esta pidiendo al back end que cuando llame el evento obras, se ejecute una funcion que le permite al backend devolver el archivo de las obras pasado de texto a array.

startServer();

subscribeGETEvent ("colección", coleccions) // cuando el frontend pida el evento coleccion se ejecuta la funcion colleccions.
function coleccions () {
    let contenido = fs.readFileSync("../data/idcoleccion.json","utf-8"); 
    return JSON.parse (contenido)// lee el archivo que contiene los id y lo devuelve como un array al frontend.
}// cuando el frontend pide el evento collecion se ejecuta la funcion collections, en la cual let crea una variable llmada contenido que lee el archivo de los ides en texto, y luego json.parse convierte el archivo a array para devolverselo al frontend.

subscribePOSTEvent  ("modificarColección", numero) // cuando el back recibe el evento modificar coleccion se ejecuta la funcion numero.
function numero (data) { // data es el objeto que manda el frontend. tiene la informacion de los ids y si es true or false ( agregarlos o no) // booleano es un dato que tiene 2 valores, true y false.

    if (data.enColección == true) { // en coleccion que indica true si la obra debe agregarse o false si la obra no debe agregarse.
        let contenido = JSON.parse(fs.readFileSync("../data/idcoleccion.json","utf-8")); // leo el archivo de los ids en texto, lo convierto en array y lo guardo en la variable contenido.
        
        contenido.push(data.id); // guarda el id recibido desde el front end en la variable contenido, que contiene el array del archivo con todos los ids.(push guarda) data.id es el id que llega desde el frontend.

        let idcoleccionjson = JSON.stringify(contenido, null, 2); // vuelvo a convertir el array en json (texto) null 2 es para hacerlo con sangria.
        fs.writeFileSync("../data/idcoleccion.json", idcoleccionjson); // guardo los ids seleccionados (idcolleccionjson) en el archivo de los ids

        return true; // devuelve true al frontend
    } // cuando el backend recibe el evento modificarcolleccion, se ejecuta la funcion numero, que si data es true, lee el archivo de los ids en teeexto, y lo convierte de json a array y lo guarda en la variable contenido. luego la funcion push guarda en ls variable contenido que contiene el array del archivo de los ids el id que selecciono el frontend. luego se vuelve a convertir el archivo de los ids de array a json y se fuarda en la variable contenido, y luego esta variable se guarda en el archivo de los ids. 
    else {
        let contenido = JSON.parse(fs.readFileSync("../data/idcoleccion.json","utf-8")); // lee el archivo de los ids lo convierte a array y lo guarda en la variable contenido.


        
    
            let idcoleccionjson = JSON.stringify(resultado, null, 2); // lo vuelvo a convertir en json porque no se agrego ningun id
            fs.writeFileSync("../data/idcoleccion.json", idcoleccionjson); // guardo la variable id coleccionjson con el archivo que no agregue ningun id en el archivo de los ids
    


        return false;

    }
}

subscribeGETEvent("obrasColección", devolverColeccion);

function devolverColeccion() {
    let ids = JSON.parse(fs.readFileSync("../data/idcoleccion.json", "utf-8"));// leo el archivo de los ids en texto, lo convierto de json a array y lo guardo en la variable ids.
    let obras = JSON.parse(fs.readFileSync("../data/obras.json", "utf-8")); // lo mismo q arriba pero con el archivo de las obras y con la variable obras.
    let obrasEnColeccion = [];
    
    for (let i = 0; i < obras.length; i++) { // mientras que el for recorre el array en bucle, i aumenta uno por cada obra que pase.
        if (ids.includes(obras[i].id)) { // si el id de la obra se encuentra en variable ids que contiene el array con los ids se agrega a la variable obrasencoleccion.
            obrasEnColeccion.push(obras[i])// guarda las obras que tienen el id en true en obrasencoleccion. ( la variable)
        }
    }

    return obrasEnColeccion;
}


