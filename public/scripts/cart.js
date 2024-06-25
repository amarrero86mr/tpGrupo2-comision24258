document.addEventListener('DOMContentLoaded', function(event){
    event.preventDefault();

    const card_items = Array.from(document.querySelectorAll('.produto_revisar'));
    const items = card_items.map(card_item => {
        return {
            card_item: card_item,
            btn_mas: card_item.querySelector('.cart_btn_mas'),
            btn_menos: card_item.querySelector('.cart_btn_menos'),
            inp_masmenos: card_item.querySelector('.inp_masmenos'),
            precio_subtotal: card_item.querySelector('.precio_subtotal'),
            eliminar_item: card_item.querySelector('.cart_cant_enliminar'),
            cant_items: parseInt(card_item.querySelector('.inp_masmenos').value, 10),
            precio_item: 5000 // Puedes hacer esto dinámico si el precio varía
        };
    });

    const cant_total = document.querySelector('#cart_prod_total');
    const total_importe = document.querySelector('#cart_total_importe');

    function calcularTotales() {
        let totalCantidad = 0;
        let totalPrecio = 0;
        items.forEach(item => {
            totalCantidad += item.cant_items;
            totalPrecio += item.cant_items * item.precio_item;
        });
        // console.log(`Total Cantidad: ${totalCantidad}`);
        cant_total.innerHTML = `${totalCantidad}`
        // console.log(`Total Precio: ${totalPrecio}`);
        total_importe.innerHTML = `$  ${totalPrecio}`
    }

    items.forEach(item => {
        item.btn_mas.addEventListener('click', function(e) {
            if (e) {
                item.cant_items++;
            }
            mostrarCant(item);
            calcularTotales();
        });

        item.btn_menos.addEventListener('click', function(e) {
            if (e && item.cant_items > 0) {
                item.cant_items--;
            }
            mostrarCant(item);
            calcularTotales();
        });

        item.eliminar_item.addEventListener('click', function(e) {
            if (e) {
                item.card_item.innerHTML = '';
                item.card_item.removeAttribute('class');
                item.cant_items = 0;
                mostrarCant(item);
                calcularTotales();
            }
        });

        function mostrarCant(item) {
            item.inp_masmenos.value = item.cant_items;
            let subtotal = item.precio_item * item.cant_items;
            item.precio_subtotal.innerHTML = `${subtotal}`;
        }

        mostrarCant(item);
    });

    calcularTotales();
});
