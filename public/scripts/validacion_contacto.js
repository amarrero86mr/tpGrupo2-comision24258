// hacemos referencia y tomamos lo eventos del documento
document.addEventListener("DOMContentLoaded", function() {
    const form_contacto = document.getElementById("form_contacto");
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const telefono = document.getElementById("telefono");
    const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");
    const parrafo = document.getElementById("warnings");
    const radio_contactarnos = document.querySelectorAll('input[name="motcontactarnos"]');

    let motivo = "";
    let tipomotivo = "";

    // tomamos el valor de radio activado
    radio_contactarnos.forEach(radio => {
        radio.addEventListener('change', function(event) {
            motivo = event.target.value;
        });
    });

    // tomamos referencia del select generado automaticamente
    const mot_desplegable = document.getElementById("mot_desplegable");

    //capturamos el evento del select
    mot_desplegable.addEventListener('change', function(event) {
        if (event.target && event.target.id === 'select_consulta') {
            tipomotivo = event.target.value;
        }
    });

    // hacemos referencia y capturamos el evento submit
    form_contacto.addEventListener('submit', function(e) {
        e.preventDefault();
        // limpiamos los mensajes guardados o residuales
        let warnings = "";
        parrafo.innerHTML = "";
        // variable bandera
        let noEntrar = false;
        // variables de comparacion con expreiones regulares (me costo mucho encontrar las que funcionan)
        let regextelefono = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/g;
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

        // paso de validaciones de campos comparando valores
        if (nombre.value.length < 2) {
            warnings += `El nombre no es válido <br>`;
            noEntrar = true;
        }
        if (apellido.value.length < 2) {
            warnings += `El apellido no es válido <br>`;
            noEntrar = true;
        }
        if (!regextelefono.test(telefono.value)) {
            warnings += `El teléfono no es válido, pruebe sin espacios ni guiones <br>`;
            noEntrar = true;
        }
        if (!regexEmail.test(email.value)) {
            warnings += `El e-mail no es válido <br>`;
            noEntrar = true;
        }
        if (mensaje.value.length < 10) {
            warnings += `El mensaje es corto <br>`;
            noEntrar = true;
        }
        if (!motivo) {
            warnings += `Elija un motivo de consulta <br>`;
            noEntrar = true;
        }
        if (!tipomotivo) {
            warnings += `Elija un tipo de consulta <br>`;
            noEntrar = true;
        }

        if (noEntrar) {
            parrafo.innerHTML = warnings;
        } else {
            // tomamos los valores de los campos
            const consulta_usuario = {
                nombre: nombre.value,
                apellido: apellido.value,
                telefono: telefono.value,
                email: email.value,
                motivo_mensaje: motivo,
                tipo_motivo: tipomotivo,
                mensaje: mensaje.value
            };
            // guardamos los datos en el localStorage del navegador como ejemplo que podemos manipularlos
            localStorage.setItem('consulta_usuario', JSON.stringify(consulta_usuario));
            alert(`Formulario enviado con éxito`);
            // redireccionamos luego de 5 segundos
            setTimeout(() => {
                window.location.href = "../index.html";
            }, 5000);
        }
    });

});

