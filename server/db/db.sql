CREATE DATABASE IF NOT EXISTS ticketsdb; 

USE ticketsdb; 

CREATE TABLE usuarios ( 
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(25) NOT NULL, 
    password VARCHAR(256) NOT NULL, 
    admin TINYINT NOT NULL, 
    PRIMARY KEY (id)
);

CREATE TABLE tickets ( 
    ticket_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    status ENUM('open', 'closed') DEFAULT 'open', 
    cantidad_coins INT NOT NULL, 
    metodo_pago VARCHAR(32) NOT NULL, 
    url_boleta VARCHAR(2048) NULL,
    comprobante_cargado TINYINT DEFAULT 0 NOT NULL,
    created_by INT, 
    created_date DATE DEFAULT (CURRENT_DATE),
    PRIMARY KEY (ticket_id), 
    FOREIGN KEY (created_by) REFERENCES usuarios(id) ON DELETE NO ACTION
);

CREATE TABLE comprobantes ( 
    comprobante_id INT NOT NULL AUTO_INCREMENT,
    url_comprobante VARCHAR(2048) NULL,
    ticket_id INT, 
    cargado_en DATE DEFAULT (CURRENT_DATE),
    PRIMARY KEY (comprobante_id), 
    FOREIGN KEY (ticket_id) REFERENCES tickets(ticket_id)
);

CREATE TABLE items ( 
    item_id INT NOT NULL AUTO_INCREMENT,
    description TEXT NULL, 
    name_item VARCHAR(255) NOT NULL,
    img_url VARCHAR(2048) NULL,
    price INT NOT NULL, 
    category VARCHAR(100) NOT NULL,
    PRIMARY KEY (item_id)
);

-- NO ESTÁ CONTEMPLADO EL HECHO DE QUE SI SE BORRA UN USUARIO SE BORRE EL TICKET, POR ENDE, NO BORRAR USUARIOS
-- TAMPOCO TICKETS, PARA EVITAR ERRORES.