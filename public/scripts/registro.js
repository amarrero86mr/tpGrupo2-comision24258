document.getElementById('form').addEventListener('submit', async function(e) {
    e.preventDefault();

    let warnings = "";
    let noEntrar = false;
    let regexn_documento = /\d{8,12}/g;
    let regexaltura = /\d{1,5}/g;
    let regexcpostal = /\d{4}/g;
    let regextelefono = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/g;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    let regexpass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*-]).{8,20}$/g;
    
    const parrafo = document.getElementById("warnings");
    parrafo.innerHTML = "";

    const submitButton = document.querySelector('.button_send');
    submitButton.disabled = true; // Deshabilitar el botón de envío


    // Validaciones campo a campo
    if (nombre.value.length < 2) {
        warnings += `El nombre no es valido <br>`;
        noEntrar = true;
    }
    if (apellido.value.length < 2) {
        warnings += `El apellido no es valido <br>`;
        noEntrar = true;
    }
    if (!regexn_documento.test(n_documento.value)) {
        warnings += `El Nuemero de Documento no es valido, pruebe sin puntos ni guiones <br>`;
        noEntrar = true;
    }
    if (provincia_select.value == '') {
        warnings += `No ha seleccionado una provincia <br>`;
        noEntrar = true;
    }
    if (ciudad_localidad.value.length < 4) {
        warnings += `La ciudad o localidad no es valido <br>`;
        noEntrar = true;
    }
    if (calle.value.length < 4) {
        warnings += `La calle no es valido <br>`;
        noEntrar = true;
    }
    if (!regexaltura.test(altura.value)) {
        warnings += `La altura no es valido <br>`;
        noEntrar = true;
    }
    if (!regexcpostal.test(cpostal.value)) {
        warnings += `El Codigo Postal no es valido <br>`;
        noEntrar = true;
    }
    if (!regextelefono.test(telefono.value)) {
        warnings += `El telefono no es valido, pruebe sin espacios ni guiones <br>`;
        noEntrar = true;
    }
    if (!regexEmail.test(email.value)) {
        warnings += `El e-mail no es valido <br>`;
        noEntrar = true;
    }
    if (re_email.value != email.value) {
        warnings += `El e-mail no coincide con el anterior <br>`;
        noEntrar = true;
    }
    if (!regexpass.test(pass.value)) {
        warnings += `La contraseña es incorrecta, asegurese de tener una numero, un digito, un simbolo y debe tener entre 8 y 20 caracteres <br>`;
        noEntrar = true;
    }
    if (re_pass.value != pass.value) {
        warnings += `La constraseña no coincide con el anterior <br>`;
        noEntrar = true;
    }
    if (!acept_terminos.checked) {
        warnings += `Los terminos y condiciones deben ser aceptados <br>`;
        noEntrar = true;
    }

    if (noEntrar) {
        parrafo.innerHTML = warnings;
    } else {
        const usuario = {
            nombre: nombre.value,
            apellido: apellido.value,
            tipo_documento: tipo_documento.value,
            num_documento: n_documento.value,
            genero: genero.value,
            tel: telefono.value,
            email: email.value,
            pass: pass.value,
            calle: calle.value,
            altura: altura.value,
            localidad: ciudad_localidad.value,
            provincia: provincia_select.value,
            cod_postal: cpostal.value,
            piso_dpto: piso_dpto.value
        };

        try {
            const response = await fetch('/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });

            if (response.ok) {
                parrafo.innerHTML = "Usuario registrado correctamente.";
                submitButton.disabled = false; // Rehabilitar el botón de envío después del éxito
            } else {
                parrafo.innerHTML = "Error al registrar el usuario. Inténtelo de nuevo.";
                submitButton.disabled = false; // Rehabilitar el botón de envío si hay errores
            }
        } catch (error) {
            parrafo.innerHTML = "Error al conectar con el servidor. Inténtelo de nuevo.";
        }
    }
});