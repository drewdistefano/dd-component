USE component;
DROP TABLE if exists records;

CREATE TABLE records (
     id INT,
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
