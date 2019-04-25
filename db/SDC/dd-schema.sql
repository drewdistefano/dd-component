CREATE DATABASE component;
USE component;

DROP TABLE IF EXISTS records;

CREATE TABLE records (
     product_id INT,
     username VARCHAR(50),
     body VARCHAR(500),
     score INT,
     prosconsReliability INT,
     prosconsDurability INT,
     prosconsLooks INT,
     performance INT,
     prosconsValue INT,
     likes INT,
     dislikes INT
 );