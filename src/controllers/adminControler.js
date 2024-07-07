const coneccionBD = require("../db/dbConfig.js");

// metodo get asincronico con renderizacion ejs
const getAllItems = async (req, res) => {
  // al metodo get... le asignamos una funcion asincronica
  const sql =
    "SELECT A.id_item, A.cod_item, A.nombre_item, C.desc_categoria, B.nombre_marca, A.stock, A.precio FROM item_tbl A LEFT OUTER JOIN marca_tbl B ON A.id_marca = B.id_marca LEFT OUTER JOIN categoria_tbl C ON A.cod_categoria = C.cod_categoria";

  try {
    const connection = await coneccionBD.getConnection(); // asignamos por la espera de la coneccion
    const [rows] = await connection.query(sql); // creamos una constante para almasenar el resitlado asincronuico de la peticion spl

    connection.release(); //liveramos el pool de coneccion
    // res.render("admin", { dataItems: rows }); // respondemos renderizando admin.ejs a la vez que le pasamos dataItems como propiedad de render
    return rows;

  } catch (err) {
    // tomamos el error y devolvemos una respuesta por pantalla y el error por consola
    res.status(500).send(`
            <h2>Internal server error</h2>
            <p>sentimos los inconvenientes, por favor intente nuevamente dentro de uno minutos o comuniquese con el administador</p>
        `);
    console.log(err);
  }
};

// metodo get por id asincronico con renderizacion edit.ejs
const getItemById = async (id) => {
  
  const sql = "SELECT A.id_item, A.cod_item, A.cod_categoria, C.desc_categoria, B.nombre_marca, A.nombre_item, A.descripcion_item, A.stock, A.precio, A.descuento, A.imgurl_1, A.imgurl_2 FROM item_tbl A LEFT OUTER JOIN marca_tbl B ON A.id_marca = B.id_marca LEFT OUTER JOIN categoria_tbl C ON A.cod_categoria = C.cod_categoria WHERE A.id_item = ?";

  try {
    const connection = await coneccionBD.getConnection(); // asignamos por la espera de la coneccion
    const [rows] = await connection.query(sql, [id]); // creamos una constante para almacenar el resutlado asincrónico de la petición sql
    // console.log(rows);

    if (!rows[0]) {
      return "Item no encontrado"; // maneja la ausencia de id
    } else {
      connection.release(); // liberamos el pool de conexión
      return rows[0]; // devolvemos la fila encontrada
    }
    
  } catch (err) {
    console.log(err);
    
    throw console.error("Internal server error");
    
  }
};

const getCreateItem = async (req, res) => {
  res.render(`create`);
};

const putEditItem = async (id, dataItemedit) => {
  const { nombre_item, id_marca, cod_categoria, descripcion_item, cod_item, stock, descuento, precio, imgurl_1, imgurl_2 } = dataItemedit;
  const sql = 'UPDATE item_tbl SET nombre_item=?, id_marca=?, cod_categoria=?, descripcion_item=?, cod_item=?, stock=?, descuento=?, precio=?, imgurl_1=?, imgurl_2=? WHERE id_item=?';
  console.log(dataItemedit);
  try {
      const connection = await coneccionBD.getConnection();
      const [rows] = await connection.query(sql, [nombre_item, id_marca, cod_categoria, descripcion_item, cod_item, stock, descuento, precio, imgurl_1, imgurl_2, id]);
      connection.release();
      console.log(rows);
      return rows;
  } catch (err) {
      console.log(err);
      throw new Error('Error al actualizar el ítem');
  }
};

const deleteItemById = async (id) => {
  const sql = "DELETE FROM item_tbl WHERE id_item = ?";
  try {
    const connection = await coneccionBD.getConnection();
    const [result] = await connection.query(sql, [id]);
    connection.release();
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('Error al eliminar el ítem');
  }
};

const postCreateItem = async (req, res) => {
  const sql =
    "INSERT INTO item_tbl (cod_item, nombre_item, descripcion_item, id_marca, cod_categoria, stock, precio, descuento, imgurl_1, imgurl_2) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const {
    cod_item,
    nombre_item,
    descripcion_item,
    id_marca,
    cod_categoria,
    stock,
    precio,
    descuento,
    imgurl_1,
    imgurl_2
  } = req.body;

  try {
    const connection = await coneccionBD.getConnection(); // asignamos por la espera de la coneccion
    const [rows] = await connection.query(sql, [
      cod_item,
      nombre_item,
      descripcion_item,
      id_marca,
      cod_categoria,
      stock,
      precio,
      descuento,
      imgurl_1,
      imgurl_2
    ]); // creamos una constante para almacenar el resutlado asincronuico de la peticion sql

    connection.release();
    
    // .affectedRows > 0

    // if (rows) {
      // Si la inserción fue exitosa, redirigir a la página de administración
      console.log(rows);
      res.redirect('admin');
      
    // } else {
    //   // Si no se insertó ninguna fila, enviar un mensaje de error
    //   res.status(500).send(`
    //     <h2>Error al crear el ítem</h2>
    //     <p>No se pudo crear el ítem. Por favor, inténtelo de nuevo.</p>
    //   `);
    // }
  } catch (err) {
    res.status(500).send(`
                <h2>Internal server error</h2>
                <p>sentimos los inconvenientes, por favor intente nuevamente dentro de unos minutos o comuniquese con el administador</p>
            `);
    console.log(err);
  }
  console.log(rows);

};


// <!-- <script src="../scripts/registro.js"></script> -->

module.exports = { getAllItems, getItemById, putEditItem, postCreateItem, getCreateItem, deleteItemById };
