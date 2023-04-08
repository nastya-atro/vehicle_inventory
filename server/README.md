-- creating user
CREATE USER 'invent_client'@'host.docker.internal' IDENTIFIED BY 'Asdfgh123456!' PASSWORD EXPIRE NEVER;
-- ALTER USER 'invent_client'@'host.docker.internal' IDENTIFIED WITH mysql_native_password BY 'L%&cx^Lj-x72fH`a';

-- drop DB if exist
DROP SCHEMA IF EXISTS `invent_db`;

-- creating schema
CREATE SCHEMA `invent_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- granting permission
GRANT ALL ON `invent_db`.* TO 'invent_client'@'localhost';

use invent_db;



// 172.17.0.1


DROP USER IF EXISTS 'invent_client'@'localhost';
DROP SCHEMA IF EXISTS `invent_db`;
CREATE USER 'invent_client'@'localhost' IDENTIFIED BY 'Asdfgh123456!' PASSWORD EXPIRE NEVER;
-- ALTER USER 'invent_client'@'localhost' IDENTIFIED WITH mysql_native_password BY 'ws3Fn%u<u7E!c#D';
CREATE SCHEMA `invent_db` CHARACTER SET utf8 COLLATE utf8_general_ci;
GRANT ALL ON `invent_db`.* TO 'invent_client'@'localhost';
