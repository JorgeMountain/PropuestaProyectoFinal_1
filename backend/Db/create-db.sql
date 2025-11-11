-- Tabla de usuarios
CREATE TABLE Usuario (
    ID_Usuario SERIAL PRIMARY KEY,
    Usuario VARCHAR(255) NOT NULL UNIQUE,
    Contrasena VARCHAR(255) NOT NULL,
    Correo VARCHAR(255) NOT NULL UNIQUE
);
-- Crear tipos ENUM requeridos

-- Crear la tabla Recetas
CREATE TABLE Recetas (
    ID_Receta SERIAL PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL UNIQUE,
    Descripcion TEXT,
    Porciones INT NOT NULL,
    Instrucciones TEXT,
    TiempoPreparacion INT NOT NULL,
    Dificultad VARCHAR NOT NULL,
    Calorias INT NOT NULL,
    Tipo VARCHAR NOT NULL
);

-- Crear la tabla Receta_Ingredientes
CREATE TABLE Receta_Ingredientes (
    ID_Ingredientes SERIAL PRIMARY KEY,
    ID_Receta INT NOT NULL REFERENCES Recetas(ID_Receta) ON DELETE CASCADE,
    Ingrediente VARCHAR(255) NOT NULL,
    Cantidad_Necesaria DECIMAL(10, 2) NOT NULL, -- Cantidad numérica
    Tipo_Cantidad VARCHAR NOT NULL 
);


-- Tabla de inventario de ingredientes del usuario
CREATE TABLE Inventario_Ingrediente (
    ID_Inventario SERIAL PRIMARY KEY,
    ID_Usuario INT NOT NULL REFERENCES Usuario(ID_Usuario) ON DELETE CASCADE,
    Ingrediente VARCHAR(255) NOT NULL,
    Cantidad_Disponible DECIMAL(10, 2) NOT NULL,
    Tipo_Cantidad VARCHAR NOT NULL -- Usar el tipo definido
);

-- Tabla de favoritos
CREATE TABLE Favoritos (
    ID_Favorito SERIAL PRIMARY KEY,
    ID_Usuario INT NOT NULL REFERENCES Usuario(ID_Usuario) ON DELETE CASCADE,
    ID_Receta INT NOT NULL REFERENCES Recetas(ID_Receta) ON DELETE CASCADE,
    Fecha_Guardado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (ID_Usuario, ID_Receta)
);

-- Insertar Usuarios
INSERT INTO Usuario (Usuario, Contrasena, Correo) VALUES 
('Juan Perez', '$2a$10$D6/HPMrq025bguVqIiPfxut8PSYTQoeSYXO62QB2S4pASLrmKFivC', 'juan.perez@example.com'),
('Maria Lopez', '$2a$10$D6/HPMrq025bguVqIiPfxut8PSYTQoeSYXO62QB2S4pASLrmKFivC', 'maria.lopez@example.com'),
('Carlos Rivera', '$2a$10$D6/HPMrq025bguVqIiPfxut8PSYTQoeSYXO62QB2S4pASLrmKFivC', 'carlos.rivera@example.com'),
('Ana Gomez', '$2a$10$D6/HPMrq025bguVqIiPfxut8PSYTQoeSYXO62QB2S4pASLrmKFivC', 'ana.gomez@example.com'),
('Luis Torres', '$2a$10$D6/HPMrq025bguVqIiPfxut8PSYTQoeSYXO62QB2S4pASLrmKFivC', 'luis.torres@example.com'),
('Laura Martinez', '$2a$10$D6/HPMrq025bguVqIiPfxut8PSYTQoeSYXO62QB2S4pASLrmKFivC', 'laura.martinez@example.com'),
('Pedro Sanchez', '$2a$10$D6/HPMrq025bguVqIiPfxut8PSYTQoeSYXO62QB2S4pASLrmKFivC', 'pedro.sanchez@example.com'),
('Sofia Ramirez', '$2a$10$D6/HPMrq025bguVqIiPfxut8PSYTQoeSYXO62QB2S4pASLrmKFivC', 'sofia.ramirez@example.com'),
('Diego Fernandez', '$2a$10$D6/HPMrq025bguVqIiPfxut8PSYTQoeSYXO62QB2S4pASLrmKFivC', 'diego.fernandez@example.com'),
('Valeria Suarez', '$2a$10$D6/HPMrq025bguVqIiPfxut8PSYTQoeSYXO62QB2S4pASLrmKFivC', 'valeria.suarez@example.com');

INSERT INTO Recetas (Nombre, Descripcion, Porciones, Instrucciones, TiempoPreparacion, Dificultad, Calorias, Tipo) VALUES
('Spaghetti Bolognese', 
 'Un delicioso plato de pasta con una rica salsa de carne y tomate, perfecto para una cena familiar.',
 4, 
 '1. Hervir agua con sal y cocinar la pasta según las instrucciones del paquete. ' ||
 '2. En una sartén, sofreír la cebolla picada con aceite de oliva hasta que esté transparente. ' ||
 '3. Agregar la carne molida y cocinar hasta que esté dorada. ' ||
 '4. Incorporar los tomates triturados, sal, pimienta y especias al gusto. Cocinar a fuego lento por 15 minutos. ' ||
 '5. Escurrir la pasta y mezclar con la salsa. ' ||
 '6. Servir caliente y decorar con queso parmesano.', 
 30, 'Intermedio', 500, 'Carnívoro'),
 ('Ensalada César', 
 'Una ensalada fresca y crujiente con lechuga romana, crutones y un delicioso aderezo César.',
 2, 
 '1. Lavar y secar las hojas de lechuga. Cortarlas en trozos grandes y colocarlas en un bol. ' ||
 '2. Añadir crutones y queso parmesano rallado. ' ||
 '3. Mezclar los ingredientes del aderezo (yema de huevo, ajo, mostaza, aceite de oliva, jugo de limón y anchoas) hasta obtener una mezcla homogénea. ' ||
 '4. Verter el aderezo sobre la ensalada y mezclar suavemente. ' ||
 '5. Servir inmediatamente.', 
 15, 'Fácil', 300, 'Vegetariano'),
 ('Pollo al Curry', 
 'Jugosos trozos de pollo cocinados en una cremosa salsa de curry, acompañados de arroz blanco.',
 4, 
 '1. Cortar el pollo en trozos pequeños y sazonar con sal y pimienta. ' ||
 '2. En una sartén grande, calentar el aceite y dorar el pollo por todos lados. Retirar y reservar. ' ||
 '3. En la misma sartén, sofreír la cebolla picada hasta que esté transparente. ' ||
 '4. Agregar curry en polvo y mezclar hasta que suelte su aroma. ' ||
 '5. Incorporar el pollo, la leche de coco y un poco de agua o caldo. ' ||
 '6. Cocinar a fuego lento durante 20 minutos, removiendo ocasionalmente. ' ||
 '7. Servir con arroz blanco caliente.', 
 40, 'Intermedio', 600, 'Carnívoro'),
 ('Sopa de Tomate', 
 'Sopa cremosa y reconfortante de tomate, perfecta para los días fríos.',
 4, 
 '1. Lavar y cortar los tomates en cuartos. Picar la cebolla y los dientes de ajo. ' ||
 '2. En una olla, calentar aceite de oliva y sofreír la cebolla y el ajo hasta que estén dorados. ' ||
 '3. Agregar los tomates, sal y pimienta. Cocinar durante 10 minutos. ' ||
 '4. Verter caldo de verduras y cocinar a fuego medio por 15 minutos. ' ||
 '5. Licuar la mezcla hasta obtener una textura cremosa. ' ||
 '6. Volver a la olla, calentar y agregar un poco de crema al gusto. ' ||
 '7. Servir con albahaca fresca como decoración.', 
 25, 'Fácil', 250, 'Vegetariano'),
('Pizza Margarita', 
 'Pizza clásica italiana con una base de salsa de tomate, mozzarella y albahaca fresca.',
 2, 
 '1. Precalentar el horno a 250°C (480°F). ' ||
 '2. Extender la masa de pizza sobre una superficie enharinada y colocarla en una bandeja para hornear. ' ||
 '3. Untar la masa con una capa uniforme de salsa de tomate. ' ||
 '4. Colocar rodajas de mozzarella fresca sobre la salsa. ' ||
 '5. Hornear la pizza durante 10-12 minutos o hasta que la masa esté dorada y el queso derretido. ' ||
 '6. Decorar con hojas de albahaca fresca y un chorrito de aceite de oliva antes de servir.', 
 20, 'Intermedio', 700, 'Vegetariano'),
('Paella de Mariscos', 
 'Un plato tradicional español que combina arroz con mariscos frescos y especias.',
 4, 
 '1. Lavar los mariscos (calamares, mejillones y langostinos) y reservar. ' ||
 '2. En una sartén grande o paellera, calentar aceite de oliva y sofreír el ajo y la cebolla picados. ' ||
 '3. Agregar el arroz y remover durante 2 minutos para que absorba el sabor. ' ||
 '4. Verter caldo de pescado caliente junto con azafrán y especias al gusto. ' ||
 '5. Añadir los mariscos y los pimientos cortados en tiras. ' ||
 '6. Cocinar a fuego medio hasta que el arroz esté tierno y los mariscos cocidos. ' ||
 '7. Dejar reposar unos minutos antes de servir.', 
 40, 'Difícil', 600, 'Mediterráneo'),
('Tacos de Pollo', 
 'Tortillas suaves rellenas de pollo desmenuzado y vegetales frescos, con un toque mexicano.',
 4, 
 '1. Cocinar las pechugas de pollo en agua con sal hasta que estén tiernas. ' ||
 '2. Desmenuzar el pollo y sazonarlo con especias como comino, pimentón y orégano. ' ||
 '3. Calentar las tortillas de maíz en un sartén. ' ||
 '4. Rellenar las tortillas con el pollo, lechuga picada, tomate en cubos y queso rallado. ' ||
 '5. Servir con guacamole o salsa al gusto.', 
 30, 'Intermedio', 450, 'Carnívoro'),
('Brownies de Chocolate', 
 'Un postre clásico con un rico sabor a chocolate y una textura densa.',
 6, 
 '1. Derretir el chocolate con mantequilla al baño maría. ' ||
 '2. En un bol, mezclar los huevos con el azúcar hasta obtener una mezcla cremosa. ' ||
 '3. Incorporar el chocolate derretido a la mezcla y agregar harina tamizada. ' ||
 '4. Verter la mezcla en un molde previamente engrasado. ' ||
 '5. Hornear a 180°C (350°F) durante 25-30 minutos o hasta que al insertar un palillo salga limpio. ' ||
 '6. Dejar enfriar antes de cortar en porciones.', 
 50, 'Fácil',300,'Postre');



-- Insertar Ingredientes Necesarios para las Recetas
-- Insertar Ingredientes Necesarios para las Recetas
INSERT INTO Receta_Ingredientes (ID_Receta, Ingrediente, Cantidad_Necesaria, Tipo_Cantidad) VALUES
(1, 'Spaghetti', 200, 'gramos'),
(1, 'Carne molida', 150, 'gramos'),
(1, 'Tomate', 3, 'unidad'),
(1, 'Cebolla', 1, 'unidad'),
(1, 'Aceite de oliva', 30, 'mililitros'),
(1, 'Queso parmesano', 20, 'gramos'),
(2, 'Lechuga', 1, 'unidad'),
(2, 'Crutones', 50, 'gramos'),
(2, 'Aderezo César', 30, 'mililitros'),
(2, 'Queso parmesano', 20, 'gramos'),
(3, 'Pollo', 200, 'gramos'),
(3, 'Curry en polvo', 10, 'gramos'),
(3, 'Leche de coco', 50, 'mililitros'),
(3, 'Aceite vegetal', 30, 'mililitros'),
(3, 'Cebolla', 1, 'unidad'),
(4, 'Tomate', 4, 'unidad'),
(4, 'Cebolla', 1, 'unidad'),
(4, 'Ajo', 2, 'unidad'),
(4, 'Aceite de oliva', 20, 'mililitros'),
(4, 'Caldo de verduras', 500, 'mililitros'),
(4, 'Crema de leche', 100, 'mililitros'),
(5, 'Masa de pizza', 1, 'unidad'),
(5, 'Salsa de tomate', 100, 'gramos'),
(5, 'Mozzarella', 150, 'gramos'),
(5, 'Albahaca fresca', 10, 'gramos'),
(6, 'Arroz', 300, 'gramos'),
(6, 'Calamares', 100, 'gramos'),
(6, 'Mejillones', 100, 'gramos'),
(6, 'Langostinos', 100, 'gramos'),
(6, 'Caldo de pescado', 500, 'mililitros'),
(6, 'Pimientos', 50, 'gramos'),
(7, 'Pollo', 200, 'gramos'),
(7, 'Tortillas', 4, 'unidad'),
(7, 'Lechuga', 1, 'unidad'),
(7, 'Tomate', 1, 'unidad'),
(7, 'Queso rallado', 50, 'gramos'),
(8, 'Chocolate', 200, 'gramos'),
(8, 'Mantequilla', 100, 'gramos'),
(8, 'Azúcar', 150, 'gramos'),
(8, 'Harina', 100, 'gramos'),
(8, 'Huevos', 2, 'unidad');


-- Insertar Inventario de Ingredientes del Usuario
INSERT INTO Inventario_Ingrediente (ID_Usuario, Ingrediente, Cantidad_Disponible, Tipo_Cantidad) VALUES
(1, 'Spaghetti', 500, 'gramos'),
(1, 'Carne molida', 300, 'gramos'),
(1, 'Tomate', 5, 'unidad'),
(2, 'Lechuga', 2, 'unidad'),
(2, 'Crutones', 100, 'gramos'),
(2, 'Aderezo César', 100, 'mililitros'),
(3, 'Pollo', 400, 'gramos'),
(3, 'Curry en polvo', 20, 'gramos'),
(3, 'Leche de coco', 100, 'mililitros'),
(4, 'Arroz', 1, 'kilogramos'),
(4, 'Calamares', 200, 'gramos'),
(4, 'Mejillones', 200, 'gramos'),
(5, 'Harina', 2, 'kilogramos'),
(5, 'Chocolate', 500, 'gramos'),
(5, 'Huevos', 12, 'unidad');

-- Insertar Favoritos
INSERT INTO Favoritos (ID_Usuario, ID_Receta) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 5),
(3, 6),
(3, 7),
(4, 8),
(5, 7),
(5, 8);
