CREATE DATABASE IF NOT EXISTS real_estate_db;

CREATE USER real_estate_admin WITH PASSWORD 'real_estate_password';

GRAND ALL PRIVILEGES ON DATABASE real_estate_db TO real_estate_admin;