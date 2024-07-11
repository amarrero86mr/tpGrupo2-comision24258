CREATE TABLE IF NOT EXISTS `usuario_tbl` (
	`id_usuario` INT(50) NOT NULL AUTO_INCREMENT,
	`admin_user` BOOL NOT NULL DEFAULT FALSE,
	`nombre` VARCHAR(45) DEFAULT NULL,
	`apellido` VARCHAR(45) DEFAULT NULL,
    `tipo_documento` VARCHAR(20) DEFAULT NULL,
    `num_documento` VARCHAR(16) DEFAULT NULL,
    `genero` VARCHAR(12) DEFAULT NULL,
	`tel` VARCHAR(16) DEFAULT NULL,
	`email` VARCHAR(100) NOT NULL,
	`pass` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id_usuario`)
);
/* insert into `usuario_tbl` (`admin_user`,`nombre`,`apellido`,`tipo_documento`,`num_documento`,`genero`,`tel`,`email`,`pass`)
values( '', '', '', '', '', '', '', '', '');*/


/* prueba de carga de usuarios*/
insert into `usuario_tbl` (`admin_user`,`nombre`,`apellido`,`tipo_documento`,`num_documento`,`genero`,`tel`,`email`,`pass`)
values 
	(true, 'Nora', 'Admin','dni','12312312', 'femenino', '123456789', 'adminNora@example.com', 'Admin-1234'),
	(true, 'Rodrigo', 'Admin', 'dni', '12345678', 'masculino', '987654321', 'adminRodrigo@example.com', 'Admin-1234'),
	(true, 'Agustin', 'Admin', 'dni', '12345678', 'masculino', '123123123','carlos.lopez@example.com', 'Admin-1234'),
	(false, 'Juan', 'Pérez', '', '', '', '123456789', 'user1@example.com', 'User-1234'),
	(false, 'Ana', 'García', '', '', '', '987654321', 'user2@example.com', 'User-1234'),
	(false, 'Carlos', 'Lopez', '', '', '', '123123123', 'user3@example.com', 'User-1234');

select * from usuario_tbl;

CREATE TABLE IF NOT EXISTS `direccion_tbl` (
	`id_usuario` INT(50) NOT NULL,
    `entrega` BOOL DEFAULT TRUE,
	`calle` VARCHAR(50) DEFAULT NULL,
	`altura` int(6) DEFAULT NULL,
    `localidad` VARCHAR(50) DEFAULT NULL,
	`provincia` VARCHAR(50) DEFAULT NULL,
	`cod_postal` int(5) DEFAULT NULL,
	`piso_dpto` VARCHAR(10) DEFAULT NULL
);

/* prueba de carga de direccion*/
insert into `direccion_tbl` (`id_usuario`, `entrega`, `calle`, `altura`, `localidad`, `provincia`, `cod_postal`, `piso_dpto`)
values
	(3, true, 'acassuso', 1234, 'iruya', 'jujuy', 1234, '3-b'),
    (4, true, 'oliden', 234, 'liniers', 'caba', 1408, 'b'),
    (5, false, 'pasco', 2234, 'ramos mejia', 'buenos aires', 1425, '6-c')
;



CREATE TABLE IF NOT EXISTS `categoria_tbl` (
	`cod_categoria` INT(5) NOT NULL AUTO_INCREMENT,
    `desc_categoria` VARCHAR(25) NOT NULL,
    PRIMARY KEY (`cod_categoria`)
);

/* prueba de carga de categoria*/
insert into `categoria_tbl` (`desc_categoria`)
values
	('accesorio'),
    ('bolso'),
    ('bombilla'),
    ('mate'),
    ('termo'),
    ('yerba')
;

-- select * from categoria_tbl;

CREATE TABLE IF NOT EXISTS `marca_tbl` (
	`id_marca` INT(5) NOT NULL AUTO_INCREMENT,
    `nombre_marca` VARCHAR(35) NOT NULL,
    PRIMARY KEY (`id_marca`)
);

/* prueba de carga de marca*/
insert into `marca_tbl` (`nombre_marca`)
values
	('Tradicion Criolla'),
	('MATESUR'),
    ('Amanda'),
    ('Canarias'),
    ('Pipore'),
    ('Playadito'),
    ('Sara'),
    ('Thermio'),
    ('Waterdog'),
    ('Artentino')
;

CREATE TABLE IF NOT EXISTS `item_tbl` (
	`id_item` INT(50) NOT NULL AUTO_INCREMENT,
	`cod_item` VARCHAR(16) NOT NULL,
    `nombre_item` VARCHAR(50) NOT NULL,
	`descripcion_item` VARCHAR(200) NOT NULL,
	`id_marca` INT(5) NOT NULL,
	`cod_categoria` INT(5) NOT NULL,
    `stock` INT(5) NOT NULL,
    `precio` FLOAT(30,2) NOT NULL,
    `descuento` INT(3) DEFAULT NULL,
	`imghtml_min` VARCHAR(250) DEFAULT NULL,
    `imgurl_1` VARCHAR(200) DEFAULT NULL,
    `imgurl_2` VARCHAR(200) DEFAULT NULL,
    `imgurl_3` VARCHAR(200) DEFAULT NULL,
    PRIMARY KEY (`id_item`),
    FOREIGN KEY (`id_marca`) REFERENCES `marca_tbl`(`id_marca`),
    FOREIGN KEY (`cod_categoria`) REFERENCES `categoria_tbl`(`cod_categoria`)
);

/* prueba de carga de item*/
insert into `item_tbl` (
`cod_item`, `nombre_item`, `descripcion_item`, `id_marca`, `cod_categoria`, `stock`, `precio`, `descuento`, `imghtml_min`, `imgurl_1`, `imgurl_2`, `imgurl_3`)
values
	('BBL0101','bombilla de acero inoxidable', 'Bombilla de acero inoxidable filtro pala picoloro', 2, 3, 32, 8000, 0, 
    '<a href="https://postimg.cc/GHYsHyfT" target="_blank"><img src="https://i.postimg.cc/GHYsHyfT/1-bombilla-picoloro.png" alt="1-bombilla-picoloro"/></a>',
    'https://i.postimg.cc/J4Y3Y3cx/1-bombilla-picoloro.png', '',''),
    ('YMA0101', 'yerba amanda', 'Amanda Tradicional por 1kg', 3, 6, 65, 4500, 10, 
    '<a href="https://postimg.cc/2qX5HkJf" target="_blank"><img src="https://i.postimg.cc/2qX5HkJf/1-ym-amanda.png" alt="1-ym-amanda"/></a><br/><br/>',
    'https://i.postimg.cc/Ssmzxjfj/1-ym-amanda.png', '',''),
    ('TWD0101', 'termo de acero inoxidable', 'Termo Waterdog de acero inoxidable en color negro con pico de vertido 360º y manija de transporte', 9, 5, 20, 84999, 20,
    '<a href="https://postimg.cc/Mc4W7sM6" target="_blank"><img src="https://i.postimg.cc/Mc4W7sM6/5-termo-waterdog-negro.png" alt="5-termo-waterdog-negro"/></a><br/><br/>',
    'https://i.postimg.cc/fLWJhpM9/5-termo-waterdog-negro.png', 'https://i.postimg.cc/pT0yVCd1/6-termo-waterdog-negro-pico.png', ''),
    ('MMA0101', 'mate de madera', 'Mate de madera algarrobo base decorada en negro con bombilla de aluminio', 10, 4, 35, 6550, 0,
    '<a href="https://postimg.cc/xNGnSns8" target="_blank"><img src="https://i.postimg.cc/xNGnSns8/1-mate-artentino-negro.png" alt="1-mate-artentino-negro"/></a><br/><br/>',
    'https://i.postimg.cc/6qg3nQnr/1-mate-artentino-negro.png', '','')
;

CREATE TABLE IF NOT EXISTS `pedido_tbl` (
	`id_pedido` INT(12) NOT NULL,
    `fecha` DATE NOT NULL,
    `id_usuario` INT(8) NOT NULL,
    `id_item` INT(8) NOT NULL,
    `cantidad_item` INT(4) NOT NULL,
    PRIMARY KEY (`id_pedido`),
    FOREIGN KEY (`id_usuario`) REFERENCES `usuario_tbl`(`id_usuario`),
    FOREIGN KEY (`id_item`) REFERENCES `item_tbl`(`id_item`)
);

-- taer todos los usuarios y sus diecciones
/* SELECT usuario_tbl.id_usuario, usuario_tbl.admin_user, usuario_tbl.nombre, usuario_tbl.apellido, usuario_tbl.tipo_documento, usuario_tbl.num_documento, usuario_tbl.genero, usuario_tbl.tel, usuario_tbl.email, usuario_tbl.pass,
direccion_tbl.entrega, direccion_tbl.calle, direccion_tbl.altura, direccion_tbl.localidad, direccion_tbl.provincia, direccion_tbl.cod_postal, direccion_tbl.piso_dpto FROM usuario_tbl LEFT OUTER JOIN direccion_tbl ON usuario_tbl.id_usuario = direccion_tbl.id_usuario and usuario_tbl.id_usuario;*/

/* lo siguiente elimina las tablas */
-- DROP TABLE IF EXISTS pedido_tbl, usuario_tbl, direccion_tbl, categoria_tbl, marca_tbl, item_tbl;
-- DROP TABLE IF EXISTS item_tbl;SELECT A.id_usuario, A.admin_user,A.nombre, A.apellido, A.tipo_documento, A.num_documento, A.genero, A.tel, A.email, A.pass,    B.entrega, B.calle, B.altura, B.localidad, B.provincia, B.cod_postal, B.piso_dpto FROM usuario_tbl A, direccion_tbl B  JOIN A ON B  WHERE B.id_usuario = A.id_usuario LIMIT 0, 1000
