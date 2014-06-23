-- init.sql

CREATE DATABASE db_name;
GRANT SELECT, UPDATE, INSERT, DELETE, ALTER, CREATE ON db_name.* TO 'db_user'@'db_host' IDENTIFIED BY 'db_password';
FLUSH PRIVILEGES;