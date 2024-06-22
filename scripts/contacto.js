
document.addEventListener("DOMContentLoaded", function() {
    // capturamos los campos type=radio por el name=motcontactarnos
    const radio_contactarnos = document.querySelectorAll('input[name="motcontactarnos"]');
    const mot_desplegable = document.getElementById("mot_desplegable");
    const segundo_mot_deplegable = document.getElementById("segundo_mot_deplegable");

    // creamos los elementos que aparecen automaticamente
    const res_consulta = document.createElement('select');
    res_consulta.name = 'select_consulta';
    res_consulta.className = 'select_consulta';
    res_consulta.id = 'select_consulta';

    const mensaje_consulta = document.createElement('p');
    mensaje_consulta.className = 'mensaje_consulta';

    const doc_consulta = document.createElement('input');
    doc_consulta.type = 'file';
    doc_consulta.accept = '.doc, .docx, .pdf';
    doc_consulta.className = 'doc_consulta';
    doc_consulta.id = 'doc_consulta';

    // las opciones para los select según el radio activado
    const option_consulta = [
        {value: "", text: "Elije"},
        {value: "consulta", text: "Consulta"},
        {value: "recomendacio", text: "Recomendación"},
        {value: "reclamo", text: "Reclamo"},
        {value: "problema_sistema", text: "Problema de Sistema"}
    ];
    const option_proveedor = [
        {value: "", text: "Producto"},
        {value: "yerba", text: "Yerbas"},
        {value: "termos", text: "Termos"},
        {value: "mates", text: "Mates"},
        {value: "bombilla", text: "Bombillas"},
        {value: "accesorios", text: "Accesorios"}
    ];
    const option_trabajacnos = [
        {value: "0", text: "¿Dónde vives?"},
        {value: "amba", text: "AMBA"},
        {value: "restoArgentina", text: "Resto de la Argentina"}
    ];
    
    // capturamos el evento de los radio
    radio_contactarnos.forEach(radio => {
        radio.addEventListener('change', function(event) {
            cambioRadioConsulta(event);
        });
    });

    // metodo para cambiarl la lista de opciones segin el radio activafo
    function cambioRadioConsulta(event) {
        const selectedValue = event.target.value;
        
        //limpiamos cualquier mensaje anterior o recidual guardado en memoria
        res_consulta.innerHTML = '';
        segundo_mot_deplegable.innerHTML = '';
        mensaje_consulta.innerHTML = '';

        // cargamos las listas de opciones segun corresponda
        if (selectedValue === "1") {
            option_consulta.forEach(optionData => {
                const option = document.createElement('option');
                option.value = optionData.value;
                option.textContent = optionData.text;
                res_consulta.appendChild(option);
            });
            if (!mot_desplegable.contains(res_consulta)) {
                mot_desplegable.appendChild(res_consulta);
            }
            mensaje_consulta.textContent = 'Déjanos tu mensaje en el siguiente cuadro';
            if (!segundo_mot_deplegable.contains(mensaje_consulta)){
                segundo_mot_deplegable.appendChild(mensaje_consulta);
            }
        } else if (selectedValue === "2") {
            option_proveedor.forEach(optionData => {
                const option = document.createElement('option');
                option.value = optionData.value;
                option.textContent = optionData.text;
                res_consulta.appendChild(option);
            });
            if (!mot_desplegable.contains(res_consulta)) {
                mot_desplegable.appendChild(res_consulta);
            }
            mensaje_consulta.textContent = 'Déjanos tu mensaje en el siguiente cuadro o si prefieres adjunta una presentación';
            if (!segundo_mot_deplegable.contains(mensaje_consulta)){
                segundo_mot_deplegable.appendChild(mensaje_consulta);
                segundo_mot_deplegable.appendChild(doc_consulta);
            }
        } else if (selectedValue === "3") {
            option_trabajacnos.forEach(optionData => {
                const option = document.createElement('option');
                option.value = optionData.value;
                option.textContent = optionData.text;
                res_consulta.appendChild(option);
            });
            if (!mot_desplegable.contains(res_consulta)) {
                mot_desplegable.appendChild(res_consulta);
            }

            //tomamos el evento de cambios en los select
            res_consulta.addEventListener("change", function(evento){
                let selectedOption = this.options[this.selectedIndex];
                cambioSelectConsulta(evento);
            });

            function cambioSelectConsulta(evento) {
                const selectedTrabaja = evento.target.value;

                if (selectedTrabaja == 'amba' && selectedValue === "3") {
                    mensaje_consulta.textContent = 'Adjunta tu CV y cuéntanos por qué quieres trabajar con nosotros';
                    if (!segundo_mot_deplegable.contains(mensaje_consulta)){
                        segundo_mot_deplegable.appendChild(mensaje_consulta);
                        segundo_mot_deplegable.appendChild(doc_consulta);
                    }
                } else if (selectedTrabaja == 'restoArgentina' && selectedValue === "3") {
                    mensaje_consulta.textContent = 'Déjanos tu mensaje y si prefieres adjúntanos un plan de negocios. Nos comunicaremos contigo a la brevedad.';
                    if (!segundo_mot_deplegable.contains(mensaje_consulta)){
                        segundo_mot_deplegable.appendChild(mensaje_consulta);
                        segundo_mot_deplegable.appendChild(doc_consulta);
                    }
                }
            }
        }
    }
});

