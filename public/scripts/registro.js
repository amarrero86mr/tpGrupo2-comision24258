// hacemos referencia a los campos
const form = document.getElementById("form");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const n_documento = document.getElementById("n_documento");
const provincia_select = document.getElementById("provincia-select");
const ciudad_localidad = document.getElementById("ciudad-localidad");
const calle = document.getElementById("calle");
const altura = document.getElementById("altura");
const cpostal = document.getElementById("cpostal");
const telefono = document.getElementById("telefono");
const email = document.getElementById("email");
const re_email = document.getElementById("re_email");
const pass = document.getElementById("pass");
const re_pass = document.getElementById("re_pass");
const acept_terminos = document.getElementById("acept_terminos");
const parrafo = document.getElementById("warnings")

// hacemos referencia al formulario y detenemos el envio
document.getElementById('form').addEventListener('submit', function(e){
    // instanciamos y declaramos variables de mensaje, bandera y rejex de comparacion
    e.preventDefault()
    
    let warnings = ""
    let noEntrar = false
    let regexn_documento = /\d{8,12}/g
    let regexaltura = /\d{1,5}/g
    let regexcpostal = /\d{4}/g
    let regextelefono = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/g
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    let regexpass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*-]).{8,20}$/g  
    parrafo.innerHTML = ""
// validamos campo a capmpo para poder devolver un mensaje de error especifico si lo hubiere
// nombre
    if(nombre.value.length <2){
        warnings += `El nombre no es valido <br>`
        noEntrar = true
    } 
// apellido
    if(apellido.value.length <2){
        warnings += `El apellido no es valido <br>`
        noEntrar = true
    }
//  N documento
    if(!regexn_documento.test(n_documento.value)){
        warnings += `El Nuemero de Documento no es valido, pruebe sin puntos ni guiones <br>`
        noEntrar = true
    }
// seleccion de provincia
    if(provincia_select.value == ''){
        warnings += `No ha seleccionado una provincia <br>`
        noEntrar = true
    }
// ciudad 
    if(ciudad_localidad.value.length <4 ){
        warnings += `La ciudad o localidad no es valido <br>`
        noEntrar = true
    }
// Calle
    if(calle.value.length < 4 ){
        warnings += `La calle no es valido <br>`
        noEntrar = true
    }
// altura
    if(!regexaltura.test(altura.value)){
        warnings += `La altura no es valido <br>`
        noEntrar = true
    }
// código postal
    if (!regexcpostal.test(cpostal.value)) {
        warnings += `El Codigo Postal no es valido <br>`
        noEntrar = true
    }
// teléfono
    if (!regextelefono.test(telefono.value)) {
        warnings += `El telefono no es valido, pruebe sin espacios ni guiones <br>`
        noEntrar = true
    }
// Email
    if (!regexEmail.test(email.value)) {
        warnings += `El e-mail no es valido <br>`
        noEntrar = true
    }
// repit email
    if (re_email.value != email.value) {
        warnings += `El e-mail no coincide con el anterior <br>`
        noEntrar = true
    }
// contraseña
    if (!regexpass.test(pass.value)) {
        warnings += `La contraseña es incorrecta, asegurese de tener una numero, un digito, un simbolo y debe tener entre 8 y 20 caracteres <br>`
        noEntrar = true
    }
// repit contraseña
    if (re_pass.value != pass.value) {
        warnings += `La constraseña no coincide con el anterior <br>`
        noEntrar = true
    }
// checkbox de terminos
    if (!acept_terminos.checked) {
        warnings += `Los terminos y condiciones deben ser aceptados <br>`
        noEntrar = true
    }

    if(noEntrar){
        
        parrafo.innerHTML = warnings;
    } else {
        setTimeout(() => {
            window.location.href = "../index.html";
            }, 7000);      
        
        const usuario = {
            nombre : nombre.value,
            apellido : apellido.value,
            n_documento : n_documento.value,
            provincia_select : provincia_select.value,
            ciudad_localidad : ciudad_localidad.value,
            calle : calle.value,
            altura : altura.value,
            cpostal : cpostal.value,
            telefono : telefono.value,
            email : email.value,
            pass : pass.value,
        };
        localStorage.setItem('usuario', JSON.stringify(usuario));
        alert(`Formulario enviado con exito`);
        
    }

 
});

window.addEventListener('load', () => {
    
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioGuardado) {
    console.log(usuarioGuardado);
    }
});

