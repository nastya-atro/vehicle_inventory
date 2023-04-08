-- creating user
CREATE USER 'invent_client'@'%' IDENTIFIED BY 'Asdfgh123456!' PASSWORD EXPIRE NEVER;
-- ALTER USER 'invent_client'@'%' IDENTIFIED WITH mysql_native_password BY 'L%&cx^Lj-x72fH`a';

-- drop DB if exist
DROP SCHEMA IF EXISTS `invent_db`;

-- creating schema
CREATE SCHEMA `invent_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- granting permission
GRANT ALL ON `invent_db`.* TO 'invent_client'@'%';

USE invent_db;

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int NOT NULL,
  `title` varchar(80)DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO roles(id,title) values
(1, 'admin'),(2, 'employee');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50)  NOT NULL,
  `password_hash` varchar(64) NOT NULL,
  `password_salt` varchar(16) NOT NULL,
  `role_id` int DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '0',
  `confirm_token` varchar(64)  DEFAULT NULL,
  `token_expiration_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `forgot_password_token` varchar(64) DEFAULT NULL,
  `forgot_password_expiration_date` datetime(6) DEFAULT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `token` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
);

DROP TABLE IF EXISTS `profiles`;
CREATE TABLE `profiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(80) DEFAULT NULL,
  `last_name` varchar(80) DEFAULT NULL,

  PRIMARY KEY (`id`),
  FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
);

DROP TABLE IF EXISTS `car_type`;
CREATE TABLE `car_type` (
  `id` int NOT NULL,
  `type` varchar(80)DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO car_type(id,type) values
(1, 'SUV'),(2, 'Truck'),(3, 'Hybrid');

DROP TABLE IF EXISTS `vehicle`;
CREATE TABLE `vehicle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(80) DEFAULT NULL,
  `create_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_date` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `last_connection` datetime(6) DEFAULT NULL,
  `last_geo_point` point DEFAULT NULL,
  `type_id` int DEFAULT NULL,
  `image_crop_settings` json DEFAULT NULL,
  `origin_image` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`),
  FOREIGN KEY (`type_id`) REFERENCES `car_type` (`id`),
  KEY `user_id` (`user_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);



